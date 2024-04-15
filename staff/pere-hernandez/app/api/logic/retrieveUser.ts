import { Schema } from "mongoose"

const { Types: { ObjectId } } = Schema

import { UserType, User } from "../data/index.ts"

import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

function retrieveUser(userId: string, targetUserId: string): Promise<{ username: string }> {
    //validation
    validate.text(userId, 'userId', true)
    validate.text(targetUserId, 'targetUserId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if(!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId).select('-_id username').lean()
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return { username: user.username }
        })
}

export default retrieveUser