import mongoose from 'mongoose'

const { Schema, model } = mongoose

type DuergarResilienceType = {
    name: string,
    bonusesDescription: [string]
}

const duergarResilience = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const DuergarResilience = model<DuergarResilienceType>('DuergarResilience', duergarResilience)

export { DuergarResilienceType, DuergarResilience }