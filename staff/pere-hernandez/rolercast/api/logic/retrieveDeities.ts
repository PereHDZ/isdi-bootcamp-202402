import { Deity, User } from '../data/models/index.ts'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveDeities(userId: string):Promise<[{ id: string, name: string, description: string }] | { name: string, description: string }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Deity.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
                .then(deities => 
                    deities.map<{ id, name, description }>(({ _id, name, description }) => ({
                        id: _id.toString(),
                        name,
                        description
                    }))
                )
        })
}

export default retrieveDeities