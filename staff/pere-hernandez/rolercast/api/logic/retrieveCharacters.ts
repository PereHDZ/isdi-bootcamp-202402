import mongoose, { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { Character, User } from '../data/models/index.ts'

import { ProficienciesType, SavingThrowProficienciesType, SkillsType, SpellcastingType, StatsType } from '../data/types/index.ts'

const { Schema } = mongoose

const { SystemError, NotFoundError } = errors

const { Types: { ObjectId } } = Schema

function retrieveCharacters(userId: string): Promise<[{ id: string, author: string, name: string, race: ObjectId, class: ObjectId, background: ObjectId, hp: number, stats: StatsType, proficiencies: ProficienciesType, expertises?: SkillsType, cantrips?: [ObjectId], spells?: [ObjectId], actrions?: [ObjectId], instrument: string, deity: ObjectId, fightingStyle: ObjectId, archetype: ObjectId, naturalExplorer: ObjectId }] | { author: string, name: string, race: ObjectId, class: ObjectId, background: ObjectId, hp: number, stats: StatsType, proficiencies: ProficienciesType, expertises?: SkillsType, cantrips?: [ObjectId], spells?: [ObjectId], actrions?: [ObjectId], instrument: string, deity: ObjectId, fightingStyle: ObjectId, archetype: ObjectId, naturalExplorer: ObjectId }[]> {
    //validation
    validate.text(userId, 'userId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Character.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
                .then(characters => characters.reverse())
        })
}

export default retrieveCharacters