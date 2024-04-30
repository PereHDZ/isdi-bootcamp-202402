import mongoose from 'mongoose'

import skills from './skills.ts'

const { Schema } = mongoose

const background = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    skills: {
        type: skills,
        required: true
    }
})

export default background