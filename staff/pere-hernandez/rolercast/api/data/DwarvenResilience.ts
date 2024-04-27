import mongoose from 'mongoose'

const { Schema, model } = mongoose

type DwarvenResilienceType = {
    name: string,
    bonusesDescription: [string]
}

const dwarvenResilience = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const DwarvenResilience = model<DwarvenResilienceType>('DwarvenResilience', dwarvenResilience)

export { DwarvenResilienceType, DwarvenResilience }