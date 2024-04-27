import mongoose from 'mongoose'

const { Schema, model } = mongoose

type BraveType = {
    name: string,
    bonusesDescription: [string]
}

const brave = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const Brave = model<BraveType>('Brave', brave)

export { BraveType, Brave }