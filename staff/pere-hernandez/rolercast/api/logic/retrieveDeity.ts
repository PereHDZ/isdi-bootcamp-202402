import { Deity, User } from '../data/models/index.ts'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveDeity(userId: string, deityId: string): Promise<{ name: string, description: string }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(deityId, 'deityId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Deity.findById(deityId).select('name description').lean()
        })
        .then(deity => {
            if (!deity) throw new NotFoundError('deity not found')

            return { id: deity._id.toString(), name: deity.name, description: deity.description}
        })
}

export default retrieveDeity