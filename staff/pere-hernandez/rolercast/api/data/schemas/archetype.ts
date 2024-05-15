import mongoose from 'mongoose'
import proficiencies from './proficiencies.ts'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const archetype = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    proficiencies: {
        type: proficiencies,
        required: false
    },
    knownCantrip: {
        type: ObjectId,
        ref: 'Cantrip',
        required: false
    },
    knownSpell: {
        type: ObjectId,
        ref: 'Spell',
        required: false
    }
})

export default archetype