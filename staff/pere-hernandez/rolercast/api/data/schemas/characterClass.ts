import mongoose from 'mongoose'
import savingThrowProficiencies from './savingThrowProficiencies'
import proficiencies from './proficiencies'
import spellcasting from './spellcasting'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const characterClass = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
        required: false,
    },
    hpPerLevel: {
        type: Number,
        required: false
    },
    keyAbilities: {
        type: [String],
        required: false
    },
    savingThrowProficiencies: {
        type: savingThrowProficiencies,
        required: false
    },
    proficiencies: {
        type: proficiencies,
        required: false
    },
    spellcastingAbility: {
        type: String,
        required: false
    },
    spellcasting: {
        type: spellcasting,
        required: false
    },
    parent: {
        type: ObjectId,
        ref: 'CharacterClass',
        required: false
    }
})

export default characterClass