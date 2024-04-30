import mongoose from 'mongoose'

const { Schema } = mongoose

const lightningBreath = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})


export default lightningBreath