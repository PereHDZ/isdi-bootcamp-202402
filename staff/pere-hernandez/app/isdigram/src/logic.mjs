import data from "./data/index.mjs"

//constants

var DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
var URL_REGEX = /^(http|https):\/\//



//helpers

function validateText(text, explain = 'text', checkEmptySpaceInside) {
    if (typeof text !== 'string')
        throw new TypeError(`${explain} ${text} is not a string`)
    if (!text.trim().length)
        throw new Error(`${explain} >${text}< is empty or blank`)
    if (checkEmptySpaceInside)
        if (text.includes(' '))
            throw new Error(`${explain} ${text} has empty spaces`)
}


function validateDate(date, explain = 'date') {
    if (typeof date !== 'string')
        throw new TypeError(`${explain} is not a string`)
    if (!DATE_REGEX.test(date))
        throw new Error(`${explain} is not a valid date`)
}


function validateEmail(email, explain = 'email') {
    if (!EMAIL_REGEX.test(email))
        throw new Error(`${explain} is not an email`)
}


function validatePassword(password, explain = 'password') {
    if (!PASSWORD_REGEX.test(password))
        throw new Error(`${explain} has an invalid format`)
}


function validateUrl(url, explain = 'url') {
    if (!URL_REGEX.test(url))
        throw new Error(`${explain} is not an url`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function')
        throw new TypeError(`${explain} is not a Function`)
}



//logic

//USER-related functions

function registerUser(username, email, password, confirmedPassword, callback) {
    //validation    
    validateText(username, 'username')
    validateEmail(email, 'email')
    validatePassword(password, 'password')
    validatePassword(confirmedPassword, 'confirmedPassword')
    validateCallback(callback, 'callback')

    //logic
    if (password !== confirmedPassword) {
        callback(new Error("Passwords don't match"))

        return
    }

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status > 499) {
            callback(new Error('system error'))

            return
        } else if (status > 399) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status > 299) {
            callback(new Error('system error'))

            return
        } else callback(null)
    }

    xhr.open('POST', 'http://localhost:8000/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, email, password, confirmedPassword }

    const json = JSON.stringify(user)

    xhr.send(json)
}


function loginUser(username, password, callback) {
    //validation
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    //logic
    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status > 499) {
            callback(new Error('system error'))

            return
        } else if (status > 399) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status > 299) {
            callback(new Error('system error'))

            return
        } else {
            const userId = JSON.parse(json)

            sessionStorage.userId = userId

            callback(null)
        }
    }
    xhr.open('POST', 'http://localhost:8000/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, password }

    const json = JSON.stringify(user)

    xhr.send(json)
}


function retrieveUser(callback) {
    //validation
    validateCallback(callback)

    //logic
    var xhr = new XMLHttpRequest

    xhr.onload = function(){
        const { status, responseText: json } = xhr

        if (status > 499){
            callback(new Error('system error'))

            return
        } else if (status > 399) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status > 299) {
            callback(new Error('system error'))

            return
        } else {
            const user = JSON.parse(json)

            callback(null, user)
        }
    }

    xhr.open('GET', `http://localhost:8000/users/${sessionStorage.userId}`)

    xhr.send()
}


function retrieveUsers(callback) {
    //validation
    validateCallback(callback)

    //logic
    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status > 499){
            callback(new Error('system error'))

            return
        } else if (status > 399) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status > 299) {
            callback(new Error('system error'))

            return
        } else callback(null)
    }

    xhr.open('GET', `http://localhost:8000/users/${sessionStorage.userId}`)

    xhr.send()
}


function logoutUser() {
    var user = data.users.findOne(function (user) {
        return user.id === sessionStorage.userId
    })

    if (!user) {
        throw new Error('wrong credentials')
    }

    user.status = 'offline'

    data.users.updateOne(user)

    delete sessionStorage.userId
}


function getLoggedInUserId() {
    return sessionStorage.userId
}

function checkLoggedInStatus() {
    return !!sessionStorage.userId
}



//POST-related functions    

function createPost(photo, comment) {
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


function retrievePosts() {
    var posts = data.posts.getAll()

    posts.forEach(function (post) {
        var user = data.users.findOne(function (user) {
            return user.id === post.author
        })

        post.author = { id: user.id, username: user.username }
    })
    return posts.reverse()
}


function deletePost(postId) {
    //validation

    validateText(postId, 'PostId', true)

    //logic
    var post = data.posts.findOne(function (post) {
        return post.id === postId
    })

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error("can't delete somebody else's post")

    data.posts.deleteOne(function (post) {
        return post.id === postId
    })
}


function updatePost(postId, text) {
    //validation

    validateText(postId, 'PostId', true)
    validateText(text, 'text')

    //logic
    var post = data.posts.findOne(function (post) {
        return post.id === postId
    })

    if (!post)
        throw new Error('post not found')

    if (post.author !== sessionStorage.userId)
        throw new Error('post does not belong to user')

    post.comment = text

    data.posts.updateOne(post)
}



//CHAT-related functions

function createChat(user) {
    var chat = {
        users: [sessionStorage.userId, user.id],
        messages: [],
        date: new Date().toLocaleDateString('en-CA')
    }

    data.chats.insertOne(chat)

    return chat
}


function addMessageToChat(message, chatId) {
    var chat = data.chats.findOne(function (chat) {
        return chatId === chat.id
    })

    chat.messages.push(message)

    data.chats.updateOne(chat)
}


function retrieveMessagesWith(userID) {
    var chat = data.chats.findOne(function (chat) {
        return chat.users.includes(userID) && chat.users.includes(sessionStorage.userId)
    })

    if (chat)
        return chat.messages
    else
        return []
}


function retrieveChatWith(userID) {
    var chat = data.chats.findOne(function (chat) {
        return chat.users.includes(userID) && chat.users.includes(sessionStorage.userId)
    })

    return chat
}



//MESSAGE-related functions

function createMessage(message) {
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