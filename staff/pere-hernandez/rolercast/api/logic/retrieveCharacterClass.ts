import { ObjectId, Schema } from 'mongoose'

import { CharacterClass, User } from '../data/models/index.ts'
import { validate, errors } from 'com'
import { SavingThrowProficienciesType, ProficienciesType, SpellcastingType } from '../data/types/index.ts'

const { SystemError, NotFoundError } = errors
const { Types: { ObjectId } } = Schema

function retrieveCharacterClass(userId: string, characterClassId: string): Promise<{ id: string, name: string, description: string, hp?: number, hpPerLevel?: number, keyAbilities?: [string], savingThrowProficiencies?: SavingThrowProficienciesType, proficiencies?: ProficienciesType, skillCount?: number, spellcastingAbility?: string, spellcasting?: SpellcastingType, ClassActions?: [string], parent?: ObjectId }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(characterClassId, 'characterClassId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return CharacterClass.findById(characterClassId).select('id name description hp hpPerLevel keyAbilities savingThrowProficiencies proficiencies skillCount spellcastingAbility spellcasting classActions parent').lean()
        })
        .then (characterClass => {
            if (!characterClass) throw new NotFoundError('character class not found')

            return { id: characterClass._id.toString(), name: characterClass.name, description: characterClass.description, hp: characterClass.hp, hpPerLevel: characterClass.hpPerLevel, keyAbilities: characterClass.keyAbilities, savingThrowProficiencies: characterClass.savingThrowProficiencies, proficiencies: characterClass.proficiencies, skillCount: characterClass.skillCount, spellcastingAbility: characterClass.spellcastingAbility, spellcasting: characterClass.spellcasting, classActions: characterClass.classActions, parent: characterClass.parent }
        })
}

export default retrieveCharacterClass