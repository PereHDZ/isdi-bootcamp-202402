import mongoose from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const spellcasting = new Schema ({
    cantripCount: {
        type: Number,
        required: true
    },
    availableCantrips: {
        type: [ObjectId],
        ref: 'Cantrip',
        required: true
    },
    spellCount: {
        type: Number,
        required: true
    },
    availableSpells: {
        type: [ObjectId],
        ref: 'Spell',
        required: true
    }
})

export default spellcasting