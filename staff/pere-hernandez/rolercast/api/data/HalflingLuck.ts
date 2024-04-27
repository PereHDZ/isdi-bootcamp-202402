import mongoose from 'mongoose'

const { Schema, model } = mongoose

type HalflingLuckType = {
    name: string,
    bonusesDescription: [string]
}

const halflingLuck = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const HalflingLuck = model<HalflingLuckType>('HalflingLuck', halflingLuck)

export { HalflingLuckType, HalflingLuck }