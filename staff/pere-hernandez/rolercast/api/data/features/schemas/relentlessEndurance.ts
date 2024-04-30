import mongoose from 'mongoose'

const { Schema } = mongoose

const relentlessEndurance = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    }
})

export default relentlessEndurance