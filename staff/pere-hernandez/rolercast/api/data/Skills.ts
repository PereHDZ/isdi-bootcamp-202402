import mongoose from 'mongoose'

const { Schema, model } = mongoose

type SkillsType = {
    acrobatics?: number,
    animal?: number,
    arcana?: number,
    athletics?: number,
    deception?: number,
    history?: number,
    insight?: number,
    intimidation?: number,
    investigation?: number,
    medicine?: number,
    nature?: number,
    perception?: number,
    performance?: number,
    religion?: number,
    sleightOfHand?: number,
    stealth?: number,
    survival?: number
}

const skills = new Schema ({
    acrobatics: {
        type: Number,
        required: false
    },
    animal: {
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
    },
})

const Skills = model<SkillsType>('Skills', skills)

export { SkillsType, Skills }