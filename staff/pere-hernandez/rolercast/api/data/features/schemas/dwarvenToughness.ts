import mongoose from 'mongoose'

const { Schema } = mongoose

const dwarvenToughness = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    hitPointCount: {
        type: Number,
        required: true
    }
})

export default dwarvenToughness