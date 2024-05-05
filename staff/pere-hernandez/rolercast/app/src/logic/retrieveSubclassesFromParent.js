import { validate, errors } from 'com'

function retrieveSubclassesFromClass(characterClassId) {
    //validation
    validate.token(sessionStorage.token)
    validate.text(characterClassId, 'characterClassId', true)

    //logic
    return fetch(`${import.meta.env.VITE_API_URL}/classes/${characterClassId}/subclasses`, {
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

export default retrieveSubclassesFromClass