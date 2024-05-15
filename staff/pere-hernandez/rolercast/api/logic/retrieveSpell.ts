import { Spell, User } from '../data/models/index.ts'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveSpell(userId: string, spellId: string): Promise<{ name: string, description: string }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(spellId, 'spellId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Spell.findById(spellId).select('name description').lean()
        })
        .then(spell => {
            if (!spell) throw new NotFoundError('spell not found')

            return { id: spell._id.toString(), name: spell.name, description: spell.description}
        })
}

export default retrieveSpell