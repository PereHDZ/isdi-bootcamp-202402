import mongoose from 'mongoose'

const { Schema } = mongoose

const stats = new Schema ({
    Strength: {
        type: Number,
        required: true
    },
    Dexterity: {
        type: Number,
        required: true
    },
    Constitution: {
        type: Number,
        required: true
    },
    Intelligence: {
        type: Number,
        required: true
    },
    Wisdom: {
        type: Number,
        required: true
    },
    Charisma: {
        type: Number,
        required: true
    }
})

export default stats