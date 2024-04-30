import mongoose from 'mongoose'

const { Schema } = mongoose

const halflingLuck = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    }
})

export default halflingLuck