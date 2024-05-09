import mongoose, { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { NaturalExplorer, User } from '../data/models/index.ts'

import { ProficienciesType } from '../data/types/index.ts'

const { Schema } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveNaturalExplorers(userId: string): Promise<[{ id: string, name: string, description: string, proficiencies?: ProficienciesType, knownSpell?: ObjectId }] | { id: string, name: string, description: string, proficiencies?: ProficienciesType, knownSpell?: ObjectId }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return NaturalExplorer.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default retrieveNaturalExplorers