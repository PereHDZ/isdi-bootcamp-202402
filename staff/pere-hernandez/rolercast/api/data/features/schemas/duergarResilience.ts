import mongoose from 'mongoose'

const { Schema } = mongoose

const duergarResilience = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

export default duergarResilience