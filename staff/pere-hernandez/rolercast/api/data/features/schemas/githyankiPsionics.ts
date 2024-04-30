import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const githyankiPsionics = new Schema ({
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
        required: true
    }
})

export default githyankiPsionics