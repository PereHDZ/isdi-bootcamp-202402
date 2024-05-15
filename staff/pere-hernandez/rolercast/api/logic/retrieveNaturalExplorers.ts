import mongoose, { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { NaturalExplorer, User } from '../data/models/index.ts'

import { ProficienciesType } from '../data/types/index.ts'

const { Schema } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveNaturalExplorers(userId: string): Promise<[{ id: string, name: string, description: string, proficiencies?: ProficienciesType, knownSpell?: string }] | { id: string, name: string, description: string, proficiencies?: ProficienciesType, knownSpell?: string }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return NaturalExplorer.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
                .then(naturalExplorers => 
                    naturalExplorers.map<{ id, name, description, proficiencies, knownSpell }>(({ _id, name, description, proficiencies, knownSpell}) => ({
                        id: _id.toString(),
                        name, 
                        description, 
                        proficiencies, 
                        knownSpell
                    }))
                )
        })
}

export default retrieveNaturalExplorers