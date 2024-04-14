import { validate, errors } from 'com'

function createPost(image, comment, callback) {
    //validation
    validate.url(image, 'image')
    if(comment) validate.text(comment, 'comment')
    validate.callback(callback)

    //logic
    var xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status === 201) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(json)

        const constructor = errors[error]

        callback(new constructor(message))
    }
    xhr.open('POST', 'http://localhost:8000/posts')

    xhr.setRequestHeader('Authorization', sessionStorage.userId)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const post = { image, comment }

    const json = JSON.stringify(post)

    xhr.send(json)
}

export default createPost