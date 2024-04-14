import { validate, errors } from 'com'

function registerUser(username, email, password, confirmedPassword, callback){
    //validation
    validate.text(username, 'username')
    validate.mail(email, 'email')
    validate.password(password, 'password')
    validate.password(confirmedPassword, 'confirmedPassword')
    validate.callback(callback)

    //logic
    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status !== 201) {
            const { error, message } = JSON.parse(json)

            const constructor = errors[error]

            callback(new constructor(message))

            return
        }
        callback(null)
    }
    xhr.open('POST', 'http://localhost:8000/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, email, password, confirmedPassword }

    const json = JSON.stringify(user)

    xhr.send(json)
}

export default registerUser