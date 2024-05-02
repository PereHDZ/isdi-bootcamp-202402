import mongoose from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const characterClass = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
        required: false,
    },
    hpPerLevel: {
        type: Number,
        required: false
    },
    parent: {
        type: ObjectId,
        ref: 'CharacterClass',
        required: false
    }
})

export default characterClass