import mongoose from 'mongoose'

const { Schema } = mongoose

const superiorDarkvision = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    darkVisionRange: {
        type: Number,
        required: true
    }
})

export default superiorDarkvision