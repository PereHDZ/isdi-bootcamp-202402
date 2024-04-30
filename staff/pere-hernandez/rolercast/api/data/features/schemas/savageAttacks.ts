import mongoose from 'mongoose'

const { Schema } = mongoose

const savageAttacks = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    criticalHitDice: {
        type: Number,
        required: true
    }
})

export default savageAttacks