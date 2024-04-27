import mongoose from 'mongoose'

const { Schema, model } = mongoose

type SuperiorDarkvisionType = {
    name: string,
    bonusesDescription: [string],
    SuperiordarkVisionRange: number
}

const superiordarkvision = new Schema ({
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

const SuperiorDarkvision = model<SuperiorDarkvisionType>('SuperiorDarkvision', superiordarkvision)

export { SuperiorDarkvisionType, SuperiorDarkvision }