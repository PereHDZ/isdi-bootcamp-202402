import { ObjectId, Schema } from 'mongoose'

import { CharacterClass, User } from '../data/models/index.ts'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
const { Types: { ObjectId } } = Schema

function retrieveCharacterClass(userId: string, characterClassId: string): Promise<{ name: string, description: string, hp?: number, hpPerLevel?: number, keyAbilities?: [string], parent?: ObjectId }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(characterClassId, 'characterClassId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return CharacterClass.findById(characterClassId).select('_id name description hp hpPerLevel keyAbilities parent').lean()
        })
        .then (characterClass => {
            if (!characterClass) throw new NotFoundError('character class not found')

            return { name: characterClass.name, description: characterClass.description, hp: characterClass.hp, hpPerLevel: characterClass.hpPerLevel, keyAbilities: characterClass.keyAbilities, parent: characterClass.parent }
        })
}

export default retrieveCharacterClass