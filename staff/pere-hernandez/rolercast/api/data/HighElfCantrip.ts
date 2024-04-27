import mongoose from 'mongoose'

const { Schema, model } = mongoose

type HighElfCantripType = {
    name: string,
    description: [string]
}

const highElfCantrip = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    cantripCount: {
        type: Number,
        required: true
    }
})

const HighElfCantrip = model<HighElfCantripType>('HighElfCantrip', highElfCantrip)

export { HighElfCantripType, HighElfCantrip }