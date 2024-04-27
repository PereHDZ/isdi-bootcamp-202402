import mongoose from 'mongoose'

const { Schema, model } = mongoose

type HumanVersatilityType = {
    name: string,
    bonusesDescription: [string],
    carryingCapacityBonus: number,
    skillCount: number
}

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

export { HumanVersatilityType, HumanVersatility}