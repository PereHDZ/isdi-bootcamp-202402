import mongoose from 'mongoose'

const { Schema } = mongoose

const fightingStyle = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default fightingStyle