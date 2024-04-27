import mongoose from 'mongoose'

const { Schema, model } = mongoose

type PoisonBreathType = {
    name: string,
    bonusesDescription: [string]
}

const poisonBreath = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const PoisonBreath = model<PoisonBreathType>('PoisonBreath', poisonBreath)

export { PoisonBreathType, PoisonBreath }