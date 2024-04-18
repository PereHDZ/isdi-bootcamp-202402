import { validate, errors } from 'com'

function loginUser(username, password, callback) {
    //validation
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    //logic
    const user = { username, password }

    const json = JSON.stringify(user)

    return fetch('http://localhost:8000/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 200)
                return res.json()
                    .then(token => { sessionStorage.token = token })
            
            return res.json()
                .then(body => {
                    const { error, message } = JSON.parse(json)

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default loginUser