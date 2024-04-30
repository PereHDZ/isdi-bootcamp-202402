import mongoose from 'mongoose'

const { Schema } = mongoose

const cantrip = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    description: {
        type: String,
        required: true
    }
})

export default cantrip