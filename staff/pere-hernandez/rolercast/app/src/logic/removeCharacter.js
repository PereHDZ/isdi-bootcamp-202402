import { validate, errors } from 'com'

function removeCharacter(characterId) {
    //validation
    validate.text(characterId, 'characterId', true)
    validate.token(sessionStorage.token)

    //logic
    const [payloadB64] = sessionStorage.token.split('.')

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    return fetch(`${import.meta.env.VITE_API_URL}/characters/${characterId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if(res.status === 200) return

            return res.json()
                .then(body => {
                    
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default removeCharacter