import mongoose, { ObjectId, isObjectIdOrHexString } from 'mongoose'

import { validate, errors } from 'com'

import { CharacterClass, User } from '../data/models/index.ts'

import { ProficienciesType, SavingThrowProficienciesType } from '../data/types/index.ts'
import savingThrowProficiencies from '../data/schemas/savingThrowProficiencies.ts'

const { Schema } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveCharacterClasses(userId: string): Promise<[{ id: string, name: string, description: string, hp?: number, hpPerLevel?: number, keyAbilities?: [string], savingThrowProficiencies?: SavingThrowProficienciesType, proficiencies?: ProficienciesType, spellcastingAbility?: string, parent?: ObjectId }] | { name: string, description: string, hp?: number, hpPerLevel?: number, savingThrowProficiencies?: SavingThrowProficienciesType, keyAbilities?: [string], proficiencies?: ProficienciesType, spellcastingAbility?: string, parent?: ObjectId }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return CharacterClass.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default retrieveCharacterClasses