import mongoose from 'mongoose'

const { Schema, model } = mongoose

type DarkvisionType = {
    name: string,
    bonusesDescription: [string],
    darkVisionRange: number
}

const darkvision = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    darkVisionRange: {
        type: [String],
        required: true
    }
})

const Darkvision = model<DarkvisionType>('Darkvision', darkvision)

export { DarkvisionType, Darkvision }