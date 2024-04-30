import mongoose from 'mongoose'

const { Schema } = mongoose

const gnomeCunning = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    }
})

export default gnomeCunning