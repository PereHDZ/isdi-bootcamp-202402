import { validate, errors } from 'com'

import { Race, User } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveRaces(userId: string): Promise<[{ id: string, name: string, description: string }] | { name: string, description: string }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Race.find().lean().exec()
                .catch(error => { throw new SystemError(error.message)})
        })
}

export default retrieveRaces