import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const drowMagic = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    cantrip: {
        type: ObjectId,
        required: true
    }

})

export default drowMagic