import { validate, errors } from 'com'

function registerUser(username, email, password, confirmedPassword, callback){
    //validation
    validate.text(username, 'username')
    validate.mail(email, 'email')
    validate.password(password, 'password')
    validate.password(confirmedPassword, 'confirmedPassword')
    validate.callback(callback)

    //logic
    const user = { username, email, password, confirmedPassword }

    const json = JSON.stringify(user)

    return fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:json
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

export default registerUser