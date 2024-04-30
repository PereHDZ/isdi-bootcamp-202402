import mongoose from 'mongoose'

const { Schema } = mongoose

const acidBreath = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

export default acidBreath 