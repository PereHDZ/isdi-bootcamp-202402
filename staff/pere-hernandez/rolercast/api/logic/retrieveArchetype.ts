import { ObjectId, Schema } from 'mongoose'

import { Archetype, User } from '../data/models/index.ts'
import { ProficienciesType } from '../data/types/index.ts'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
const { Types: { ObjectId } } = Schema

function retrieveArchetype(userId: string, archetypeId: string): Promise<{ id: string, name: string, description: string, proficiencies?: ProficienciesType, knownCantrip?: ObjectId, knownSpell?: ObjectId }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(archetypeId, 'archetypeId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Archetype.findById(archetypeId).select('id name description proficiencies knownCantrip knownSpell ').lean()
        })
        .then(archetype => {
            if (!archetype) throw new NotFoundError('archetype not found')

            return { id: archetype._id.toString(), name: archetype.name, description: archetype.description, proficiencies: archetype.proficiencies, knownCantrip: archetype.knownCantrip, knownSpell: archetype.knownSpell }
        })
}

export default retrieveArchetype