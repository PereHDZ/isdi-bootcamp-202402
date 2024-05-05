import mongoose from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const spellcasting = new Schema ({
    cantripCount: {
        type: Number,
        required: false
    },
    availableCantrips: {
        type: [ObjectId],
        ref: 'Cantrip',
        required: false
    },
    spellCount: {
        type: Number,
        required: false
    },
    availableSpells: {
        type: [ObjectId],
        ref: 'Spell',
        required: false
    }
})

export default spellcasting