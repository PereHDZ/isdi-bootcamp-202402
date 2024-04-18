import { validate, errors } from 'com'

function createPost(image, comment) {
    //validation
    validate.url(image, 'image')
    if(comment) validate.text(comment, 'comment')

    //logic
    const post = { image, comment }

    const json = JSON.stringify(post)

    return fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`, 'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createPost