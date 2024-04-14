import { validate, errors } from 'com'

function loginUser(username, password, callback) {
    //validation
    validate.text(username, 'username', true)
    validate.password(password)
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

export default loginUser