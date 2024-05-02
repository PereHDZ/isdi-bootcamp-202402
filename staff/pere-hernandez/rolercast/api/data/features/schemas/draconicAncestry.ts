import mongoose from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const draconicAncestry = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    raceAction: {
        type: ObjectId,
        ref: 'Action',
        required: false
    }
})

export default draconicAncestry