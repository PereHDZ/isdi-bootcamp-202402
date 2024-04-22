import { validate, errors } from 'com'

const { CredentialsError } = errors

function registerUser(username, email, password, confirmedPassword){
    //validation
    validate.text(username, 'username')
    validate.mail(email)
    validate.text(password, 'password')
    validate.text(confirmedPassword, 'confirmedPassword')
    if (password !== confirmedPassword) throw new CredentialsError

    //logic
    const user = { username, email, password, confirmedPassword }

    const json = JSON.stringify(user)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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

export default registerUser