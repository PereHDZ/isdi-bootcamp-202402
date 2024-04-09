import db from '../data/index.ts'

//constants

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const URL_REGEX = /^(http|https):\/\//



//helpers

function validateText(text, explain, checkEmptySpaceInside?) {
    if (typeof text !== 'string')
        throw new TypeError(explain + ' ' + text + ' is not a string')
    if (!text.trim().length)
        throw new Error(explain + ' >' + text + '< is empty or blank')

    if (checkEmptySpaceInside)
        if (text.includes(' '))
            throw new Error(explain + ' ' + text + ' has empty spaces')
}


function validateDate(date, explain) {
    if (typeof date !== 'string')
        throw new TypeError(explain + ' ' + date) + ' is not a string'
    if (!DATE_REGEX.test(date))
        throw new Error(explain + ' ' + date + ' is not a date')
}


function validateEmail(email, explain = 'email') {
    if (!EMAIL_REGEX.test(email))
        throw new Error(explain + ' ' + email + ' is not an email')
}


function validatePassword(password, explain = 'password') {
    if (!PASSWORD_REGEX.test(password))
        throw new Error(explain + ' ' + password + ' is not a valid password')
}


function validateUrl(url, explain) {
    if (!URL_REGEX.test(url))
        throw new Error(explain + ' ' + url + ' is not an url')
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') {
        throw new TypeError(`${explain} is not a Function`)
    }
}



//logic

//USER-related functions

function registerUser(username, email, password, confirmedPassword, callback) {
    //validation    
    validateText(username, 'username', true)
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    //logic
    db.users.findOne(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (password !== confirmedPassword) {
            callback(new Error("Passwords don't match"))

            return
        }

        if (user) {
            callback(new Error('user already exists'))

            return
        }
        user = {
            username: username,
            email: email,
            password: password,
            status: 'offline'
        }
        db.users.insertOne(user, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })
}


function loginUser(username, password, callback) {
    //validation
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    //logic
    db.users.findOne(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new Error('wrong credentials'))

            return
        }

        if (user.password !== password) {
            callback(new Error('wrong credentials'))

            return
        }

        user.status = 'online'

        db.users.updateOne(user2 => user2.id === user.id, user, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null, user.id)
        })
    })
}


function logoutUser(userId, callback){
    //validation
    validateText(userId, 'userId', true)
    validateCallback(callback)

    //logic

    db.users.findOne(user => user.id === userId, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        if (!user){
            throw new Error('wrong credentials')
        }

        user.status = 'offline'

        db.users.updateOne(user2 => user2.id === user.id, user, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null, user.id)
        })     
    })
}


function retrieveUser(userId, callback) {
    //validation
    validateText(userId, 'userId', true)
    validateCallback(callback)

    //logic
    db.users.findOne(user => user.id === userId, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        delete user.id
        delete user.password
        delete user.status

        callback(null, user)
    })
}

/*
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
}*/

const logic = {
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    retrieveUser: retrieveUser/*,
    retrieveUsers, retrieveUsers,
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

    createMessage: createMessage*/
}

export default logic