import data from "./data/index.mjs"

//constants

var DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
var URL_REGEX = /^(http|https):\/\//



//helpers

function validateText(text, explain, checkEmptySpaceInside) {
    if (typeof text !== 'string')
        throw new TypeError (explain + ' ' + text + ' is not a string')
    if (!text.trim().length)
        throw new Error (explain + '>' + text + '< is empty or blank')

    if (checkEmptySpaceInside)
        if(text.includes(' '))
            throw new Error (explain + ' ' + text + ' has empty spaces')
}


function validateDate(date, explain) {
    if (!DATE_REGEX.test(date))
        throw new Error(explain + ' '+ date + ' is not a date')
}


function validateEmail(email, explain) {
    if (!EMAIL_REGEX.test(email))
        throw new Error(explain + ' ' + email + ' is not an email')
}


function validatePassword(password, explain) {
    if (!PASSWORD_REGEX.test(password))
        throw new Error(explain + ' ' + password + ' is not a valid password')
}


function validateUrl(url, explain) {
    if (!URL_REGEX.test(url))
        throw new Error(explain + ' ' + url + ' is not an url')
}



//logic

//USER-related functions

function registerUser(username, email, password, confirmedPassword){
    //validation
    
    validateText(username, 'username')
    validateEmail(email, 'email')

    //logic

    if (password !== confirmedPassword){
        throw new Error("Passwords don't match")
    }

    var user = data.users.findOne(function (user){
        return user.username === username || user.email === email
    })

    if (user) throw new Error ('user already exists')

    var user = {
        username: username,
        email: email,
        password: password,
        status: 'offline'
    }

    data.users.insertOne(user)
} 


function loginUser (username, password){
    //validation

    validateText(username, 'username', true)


    //logic

    var user = data.users.findOne(function (user){
        return user.username === username && user.password === password
    })

    if (!user) throw new Error ('wrong credentials')

    user.status = 'online'

    data.users.updateOne(user)

    sessionStorage.userId = user.id
}


function retrieveUser (){
    var user = data.users.findOne(function(user){
        return user.id === sessionStorage.userId
    })

    if (!user) throw new Error('user not found')

    return user
}


function retrieveUsers(){
    var users = data.users.getAll()

    var index = users.findIndex(function (user) {
        return user.id === sessionStorage.userId
    })

    users.splice(index, 1)

    users.forEach(function (user) {
        delete user.email
        delete user.password
    })

    users.sort(function (x, y) {
        return x.username < y.username ? -1 : 1
    }).sort(function(x, y) {
        return x.status > y.status ? -1 : 1
    })

    return users
}


function logoutUser(){
    var user = data.users.findOne(function (user) {
        return user.id === sessionStorage.userId
    })

    if (!user){
        throw new Error('wrong credentials')
    }

    user.status = 'offline'

    data.users.updateOne(user)

    delete sessionStorage.userId
}


function getLoggedInUserId () {
    return sessionStorage.userId
}

function checkLoggedInStatus(){
    return !!sessionStorage.userId
}



//POST-related functions    

function createPost (photo, comment){     
    //validation

    validateText(comment, 'comment')

    //logic

    var post = {
        author: sessionStorage.userId,
        photo: photo,
        comment: comment,
        date: new Date().toLocaleDateString('en-CA')
    }

    data.posts.insertOne(post)
}


function retrievePosts(){
    var posts = data.posts.getAll()
    
    posts.forEach(function (post) {
        var user = data.users.findOne(function (user) {
            return user.id === post.author
        })

        post.author = {id: user.id, username: user.username}
    })
    return posts.reverse()
}


function deletePost (postId) {
    //validation

    validateText(postId, 'PostId', true)

    //logic
    var post = data.posts.findOne(function (post) {
        return post.id === postId
    })

    if (!post) throw new Error ('post not found')

    if (post.author !== sessionStorage.userId) throw new Error ("can't delete somebody else's post")

    data.posts.deleteOne(function (post) {
        return post.id === postId
    })
}


function updatePost (postId, text){
    //validation

    validateText(postId, 'PostId', true)
    validateText(text, 'text')

    //logic
    var post = data.posts.findOne(function (post){
        return post.id === postId
    })

    if (!post)
        throw new Error ('post not found')

    if (post.author !== sessionStorage.userId)
        throw new Error ('post does not belong to user')

    post.comment = text

    data.posts.updateOne(post)
}



//CHAT-related functions

function createChat(user){
    var chat = {
        users: [sessionStorage.userId, user.id],
        messages: [],
        date: new Date().toLocaleDateString('en-CA')
    }

    data.chats.insertOne(chat)

    return chat
}


function addMessageToChat (message, chatId){
    var chat = data.chats.findOne(function (chat){
        return chatId === chat.id
    })

    chat.messages.push(message)
    
    data.chats.updateOne(chat)
}


function retrieveMessagesWith (userID){
    var chat = data.chats.findOne(function (chat) {
        return chat.users.includes(userID) && chat.users.includes(sessionStorage.userId)
    })

    if (chat)
        return chat.messages
    else
        return []
}


function retrieveChatWith (userID){
    var chat = data.chats.findOne(function(chat){
        return chat.users.includes(userID) && chat.users.includes(sessionStorage.userId)
    })

    return chat
}



//MESSAGE-related functions

function createMessage(message){
    var message = {
        text: message,
        author: sessionStorage.userId,
        time: new Date().toLocaleDateString('en-CA'),
        id: (+((parseInt(Math.random() * 10 ** 17)).toString())).toString(36)
    }
    return message
}

const logic = {
    registerUser: registerUser,
    loginUser: loginUser,
    retrieveUser: retrieveUser,
    retrieveUsers, retrieveUsers,
    logoutUser: logoutUser,
    getLoggedInUserId: getLoggedInUserId,
    checkLoggedInStatus: checkLoggedInStatus,

    createPost: createPost,
    retrievePosts: retrievePosts,
    deletePost: deletePost,
    updatePost: updatePost,
    
    createChat: createChat,
    addMessageToChat: addMessageToChat,
    retrieveMessagesWith: retrieveMessagesWith,
    retrieveChatWith: retrieveChatWith,

    createMessage: createMessage
}

export default logic