import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const tieflingMagic = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    cantrip: {
        type: ObjectId,
        ref: 'Cantrip',
        required: false
    }
})

export default tieflingMagic