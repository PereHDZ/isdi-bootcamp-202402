import mongoose from 'mongoose'

const { Schema, model } = mongoose

type FrostBreathType = {
    name: string,
    bonusesDescription: [string]
}

const frostBreath = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const FrostBreath = model<FrostBreathType>('FrostBreath', frostBreath)

export { FrostBreathType, FrostBreath }