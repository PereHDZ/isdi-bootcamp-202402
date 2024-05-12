import mongoose, { ObjectId } from 'mongoose'
import stats from './stats'
import proficiencies from './proficiencies'
import skills from './skills'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const character = new Schema ({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    race: {
        type: ObjectId,
        ref: 'Race',
        required: true
    },
    class: {
        type: ObjectId,
        ref: 'CharacterClass',
        required: true
    },
    background: {
        type: ObjectId,
        ref: 'Background',
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    stats: {
        type: stats,
        required: true
    },
    proficiencies: {
        type: proficiencies,
        required: true
    },
    expertises: {
        type: skills,
        required: false
    },
    cantrips: {
        type: [ObjectId],
        ref: 'Cantrip',
        required: false
    },
    spells: {
        type: [ObjectId],
        ref: 'Spell',
        required: false
    },
    actions: {
        type: [ObjectId],
        ref: 'Action',
        required: false
    },
    instrument: {
        type: String,
        required: false
    },
    deity: {
        type: ObjectId,
        ref: 'Deity',
        required: false
    },
    fightingStyle: {
        type: ObjectId,
        ref: 'FightingStyle',
        required: false
    },
    archetype: {
        type: ObjectId,
        ref: 'Archetype',
        required: false
    },
    naturalExplorer: {
        type: ObjectId,
        ref: 'NaturalExplorer',
        required: false
    }
})

export default character