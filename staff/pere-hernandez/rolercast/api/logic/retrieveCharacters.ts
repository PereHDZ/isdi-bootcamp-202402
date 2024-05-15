import mongoose, { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { Character, User } from '../data/models/index.ts'

import { ProficienciesType, SavingThrowProficienciesType, SkillsType, SpellcastingType, StatsType } from '../data/types/index.ts'

const { Schema } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveCharacters(userId: string): Promise<[{ id: string, author: string, name: string, race: string, characterClass: string, background: string, hp: number, stats: StatsType, proficiencies: ProficienciesType, expertises?: SkillsType, cantrips?: string[], spells?: string[], actions?: string[], instrument: string, deity: string, fightingStyle: string, archetype: string, naturalExplorer: string }] | { author: string, name: string, race: string, characterClass: string, background: string, hp: number, stats: StatsType, proficiencies: ProficienciesType, expertises?: SkillsType, cantrips?: string[], spells?: string[], actions?: string[], instrument: string, deity: string, fightingStyle: string, archetype: string, naturalExplorer: string }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Character.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
                .then(characters => 
                    characters.map<{ id, author, name, race, characterClass, background, hp, stats, proficiencies, expertises, cantrips, spells, actions, instrument, deity, fightingStyle, archetype, naturalExplorer }>(({ _id, author, name, race, characterClass, background, hp, stats, proficiencies, expertises, cantrips, spells, actions, instrument, deity, fightingStyle, archetype, naturalExplorer }) => ({
                        id: _id.toString(),
                        author, 
                        name, 
                        race, 
                        characterClass, 
                        background, 
                        hp, 
                        stats, 
                        proficiencies, 
                        expertises, 
                        cantrips, 
                        spells, 
                        actions, 
                        instrument, 
                        deity, 
                        fightingStyle, 
                        archetype, 
                        naturalExplorer
                    })).reverse()
                )
        })
}

export default retrieveCharacters