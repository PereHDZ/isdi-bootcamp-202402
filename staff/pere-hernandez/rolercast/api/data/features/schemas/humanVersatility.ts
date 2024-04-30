import mongoose from 'mongoose'

const { Schema } = mongoose

const humanVersatility = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    carryingCapacityBonus: {
        type: Number,
        required: true
    },
    skillCount: {
        type: Number,
        required: true
    }
})

export default humanVersatility