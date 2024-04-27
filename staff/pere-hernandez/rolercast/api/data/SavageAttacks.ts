import mongoose from 'mongoose'

const { Schema, model } = mongoose

type SavageAttacksType = {
    name: string,
    bonusesDescription: [string],
    criticalHitDice: number
}

const savageAttacks = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    criticalHitDice: {
        type: Number,
        required: true
    }
})

const SavageAttacks = model<SavageAttacksType>('SavageAttacks', savageAttacks)

export { SavageAttacksType, SavageAttacks }