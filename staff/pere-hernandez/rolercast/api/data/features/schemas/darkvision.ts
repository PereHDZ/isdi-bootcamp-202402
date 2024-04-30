import mongoose from 'mongoose'

const { Schema } = mongoose

const darkvision = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    darkVisionRange: {
        type: Number,
        required: true
    }
})

export default darkvision