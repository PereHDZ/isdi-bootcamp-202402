import mongoose from 'mongoose'

const { Schema } = mongoose

const action = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    description: {
        type: String,
        required: true
    }
})

export default action