import { validate, errors } from "com"

function logoutUser(userId, callback){
    //validation
    validate.text(userId, 'userId', true)
    validate.callback(callback)

    //logic
    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        if (status !== 201) {
            const { error, message } = JSON.parse(json)

            const constructor = errors[error]

            callback(new constructor(message))

            return
        } else {
            delete (sessionStorage.userId)

            callback(null)
        }
    }

    xhr.open('PATCH', )
}