import mongoose, { ObjectId, isObjectIdOrHexString } from 'mongoose'

import { validate, errors } from 'com'

import { Race, User } from '../data/models/index.ts'

import { FeaturesType, ProficienciesType } from '../data/types/index.ts'

const { Schema, model } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveRaces(userId: string): Promise<[{ id: string, name: string, description: string, speed?: number, features?: FeaturesType, proficiencies?: ProficienciesType, parent?: ObjectId }] | { name: string, description: string, speed?: number, features?: FeaturesType, proficiencies?: ProficienciesType, parent?: ObjectId }[]> {
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