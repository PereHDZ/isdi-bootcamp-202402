import mongoose from 'mongoose'

const { Schema } = mongoose

const skills = new Schema ({
    acrobatics: {
        type: Number,
        required: false
    },
    animalHandling: {
        type: Number,
        required: false
    },
    arcana: {
        type: Number,
        required: false
    },
    athletics: {
        type: Number,
        required: false
    },
    deception: {
        type: Number,
        required: false
    },
    history: {
        type: Number,
        required: false
    },
    insight: {
        type: Number,
        required: false
    },
    intimidation: {
        type: Number,
        required: false
    },
    investigation: {
        type: Number,
        required: false
    },
    medicine: {
        type: Number,
        required: false
    },
    nature: {
        type: Number,
        required: false
    },
    perception: {
        type: Number,
        required: false
    },
    performance: {
        type: Number,
        required: false
    },
    persuasion: { 
        type: Number,
        required: false
    },
    religion: {
        type: Number,
        required: false
    },
    sleightOfHand: {
        type: Number,
        required: false
    },
    stealth: {
        type: Number,
        required: false
    },
    survival: {
        type: Number,
        required: false
    }
})

export default skills