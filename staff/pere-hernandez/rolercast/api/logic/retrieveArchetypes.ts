import mongoose, { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { Archetype, User } from '../data/models/index.ts'

import { ProficienciesType } from '../data/types/index.ts'

const { Schema } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveArchetypes(userId: string): Promise<[{ id: string, name: string, description: string, proficiencies?: ProficienciesType, knownCantrip?: ObjectId, knownSpell?: ObjectId }] | { id: string, name: string, description: string, proficiencies?: ProficienciesType, knownCantrip?: ObjectId, knownSpell?: ObjectId }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Archetype.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
                .then(archetypes => 
                    archetypes.map<{ id, name, description, proficiencies, knownCantrip, knownSpell}>(({ _id, name, description, proficiencies, knownCantrip, knownSpell}) => ({
                        id: _id.toString(),
                        name, 
                        description, 
                        proficiencies, 
                        knownCantrip, 
                        knownSpell
                    }))
                )
        })
}

export default retrieveArchetypes