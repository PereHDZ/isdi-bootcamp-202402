import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const tieflingMagic = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    cantrip: {
        type: ObjectId,
        required: false
    }
})

export default tieflingMagic