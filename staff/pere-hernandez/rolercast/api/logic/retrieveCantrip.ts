import { Cantrip, User } from '../data/models'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveCantrip(userId: string, cantripId: string): Promise<{ name: string, description: string }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(cantripId, 'cantripId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Cantrip.findById(cantripId).select('name description').lean()
        })
        .then(cantrip => {
            if (!cantrip) throw new NotFoundError('cantrip not found')

            return { id: cantrip._id.toString(), name: cantrip.name, description: cantrip.description}
        })
}

export default retrieveCantrip