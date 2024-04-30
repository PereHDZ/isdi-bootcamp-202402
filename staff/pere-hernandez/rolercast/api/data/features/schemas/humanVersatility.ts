import mongoose from 'mongoose'

import { HumanVersatilityType } from '../types'

const { Schema, model } = mongoose

const humanVersatility = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bonusesDescription: {
        type: [String],
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

const HumanVersatility = model<HumanVersatilityType>('HumanVersatility', humanVersatility)

export default humanVersatility