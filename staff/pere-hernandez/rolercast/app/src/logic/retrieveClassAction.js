import { validate, errors } from 'com'

function retrieveClassAction(classActionId) {
    //validation
    validate.token(sessionStorage.token)
    validate.text(classActionId, 'classActionId', true)

    //logic
    return fetch(`${import.meta.env.VITE_API_URL}/classactions/${classActionId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if (res.status === 200) return res.json()

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default retrieveClassAction