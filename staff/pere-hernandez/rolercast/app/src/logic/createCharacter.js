import { validate, errors } from 'com'

function createCharacter(name, raceId, characterClassId, backgroundId, hp, stats, proficiencies, expertises, cantrips, spells, actions, instrument, deityId, fightingStyleId, archetypeId, naturalExplorerId) {
        // validation
        validate.text(name, 'name', false)
        validate.text(raceId, 'raceId', true)
        validate.text(characterClassId, 'characterClassId', true)
        validate.text(backgroundId, 'backgroundId', true)
        validate.number(hp, 'hp')
        // more validations pending

        //logic
        const post = { name, raceId, characterClassId, backgroundId, hp, stats, proficiencies, expertises, cantrips, spells, actions, instrument, deityId, fightingStyleId, archetypeId, naturalExplorerId }

        const json = JSON.stringify(post)

        return fetch(`${import.meta.env.VITE_API_URL}/characters`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`,
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

export default createCharacter