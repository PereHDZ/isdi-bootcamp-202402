import mongoose from 'mongoose'

const { Schema, model } = mongoose

type LightningBreathType = {
    name: string,
    bonusesDescription: [string]
}

const lightningBreath = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const LightningBreath = model<LightningBreathType>('LightningBreath', lightningBreath)

export { LightningBreathType, LightningBreath }