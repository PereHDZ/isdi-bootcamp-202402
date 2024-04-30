import mongoose from 'mongoose'

const { Schema } = mongoose

const poisonBreath = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    }
})

export default poisonBreath