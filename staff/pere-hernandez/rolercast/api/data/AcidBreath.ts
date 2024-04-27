import mongoose from 'mongoose'

const { Schema, model } = mongoose

type AcidBreathType = {
    name: string,
    bonusesDescription: [string]
}

const acidBreath = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const AcidBreath = model<AcidBreathType>('AcidBreath', acidBreath)

export { AcidBreathType, AcidBreath }