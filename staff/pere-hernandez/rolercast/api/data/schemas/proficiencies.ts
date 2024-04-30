import mongoose from 'mongoose'
import armour from './armour'
import skills from './skills'
import weapons from './weapons'

const { Schema } = mongoose

const proficiencies = new Schema ({
    weapons: {
        type: weapons,
        required: true,
    },
    armour: {
        type: armour,
        required: true
    },
    skills: {
        type: skills,
        required: true
    }
})

export default proficiencies