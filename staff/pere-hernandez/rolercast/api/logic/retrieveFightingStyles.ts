import { FightingStyle, User } from '../data/models'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveFightingStyles(userId: string):Promise<[{ id: string, name: string, description: string }] | { name: string, description: string }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return FightingStyle.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default retrieveFightingStyles