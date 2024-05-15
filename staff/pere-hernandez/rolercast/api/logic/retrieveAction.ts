import { Action, User } from '../data/models/index.ts'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveAction(userId: string, actionId: string): Promise<{ name: string, description: string }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(actionId, 'ActionId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Action.findById(actionId).select('name description').lean()
        })
        .then(action => {
            if (!action) throw new NotFoundError('action not found')

            return { id: action._id.toString(), name: action.name, description: action.description}
        })
}

export default retrieveAction