import mongoose from 'mongoose'

const { Schema } = mongoose

const deity = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default deity