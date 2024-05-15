import { FightingStyle, User } from '../data/models/index.ts'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveFightingStyle(userId: string, figthingStyleId: string): Promise<{ name: string, description: string }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(figthingStyleId, 'figthingStyleId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return FightingStyle.findById(figthingStyleId).select('name description').lean()
        })
        .then(fightingStyle => {
            if (!fightingStyle) throw new NotFoundError('fighting style not found')

            return { id: fightingStyle._id.toString(), name: fightingStyle.name, description: fightingStyle.description}
        })
}

export default retrieveFightingStyle