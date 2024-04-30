import mongoose from 'mongoose'
import armour from './armour.ts'
import skills from './skills.ts'
import weapons from './weapons.ts'

const { Schema } = mongoose

const proficiencies = new Schema ({
    weapons: {
        type: weapons,
        required: false,
    },
    armour: {
        type: armour,
        required: false
    },
    skills: {
        type: skills,
        required: false
    }
})

export default proficiencies