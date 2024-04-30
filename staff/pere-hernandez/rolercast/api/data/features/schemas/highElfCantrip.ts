import mongoose from 'mongoose'

const { Schema } = mongoose

const highElfCantrip = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    cantripCount: {
        type: Number,
        required: true
    }
})

export default highElfCantrip