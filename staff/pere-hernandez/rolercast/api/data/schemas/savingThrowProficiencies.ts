import mongoose from 'mongoose'

const { Schema } = mongoose

const savingThrowProficiencies = new Schema ({
    strength: {
        type: Number,
        required: false
    },
    dexterity: {
        type: Number,
        required: false
    },
    constitution: {
        type: Number,
        required: false
    },
    intelligence: {
        type: Number,
        required: false
    },
    wisdom: {
        type: Number,
        required: false
    },
    charisma: {
        type: Number,
        required: false
    }
})

export default savingThrowProficiencies