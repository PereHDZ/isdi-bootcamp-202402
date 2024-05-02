import mongoose from 'mongoose'

const { Schema } = mongoose

const raceAction = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    description: {
        type: String,
        required: true
    }
})

export default raceAction