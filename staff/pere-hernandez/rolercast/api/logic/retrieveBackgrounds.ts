import mongoose from 'mongoose'

import { validate, errors } from 'com'

import { Background, User } from '../data/models/index.ts'

import { SkillsType } from '../data/types/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveBackgrounds(userId: string): Promise<[{ id: string, name: string, description: string, skills: SkillsType }] | { id: string, name: string, description: string, skills: SkillsType }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Background.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default retrieveBackgrounds