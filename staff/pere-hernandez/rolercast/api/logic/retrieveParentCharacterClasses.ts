import mongoose, { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { CharacterClass, User } from '../data/models/index.ts'

import { ProficienciesType, SavingThrowProficienciesType, SpellcastingType } from '../data/types/index.ts'

const { Schema } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveParentCharacterClasses(userId: string): Promise<[{ id: string, name: string, description: string, hp?: number, hpPerLevel?: number, keyAbilities?: string[], savingThrowProficiencies?: SavingThrowProficienciesType, proficiencies?: ProficienciesType, skillCount?: number, spellcastingAbility?: string, spellcasting?: SpellcastingType, classActions: string[], parent?: string }] | { id: string, name: string, description: string, hp?: number, hpPerLevel?: number, savingThrowProficiencies?: SavingThrowProficienciesType, keyAbilities?: string[], proficiencies?: ProficienciesType, skillCount?: number, spellcastingAbility?: string, spellcasting?: SpellcastingType, classActions?: string[], parent?: string }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return CharacterClass.find({ parent: { $exists: false } }).lean().exec()
                .catch(error => { throw new SystemError(error.message) })
                .then(characterClasses => 
                    characterClasses.map<{ id, name, description, hp, hpPerLevel, savingThrowProficiencies, keyAbilities, proficiencies, skillCount, spellcasting, classActions, parent }>(({ _id, name, description, hp, hpPerLevel, savingThrowProficiencies, keyAbilities, proficiencies, skillCount, spellcasting, classActions, parent }) => ({
                        id: _id.toString(),
                        name, 
                        description, 
                        hp, 
                        hpPerLevel, savingThrowProficiencies, 
                        keyAbilities, 
                        proficiencies, 
                        skillCount,
                        spellcasting, 
                        classActions, 
                        parent
                    }))
                )
        })
}

export default retrieveParentCharacterClasses