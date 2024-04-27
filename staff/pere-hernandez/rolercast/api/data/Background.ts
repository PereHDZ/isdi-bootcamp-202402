import mongoose from 'mongoose'

import { Skills, SkillsType } from './Skills'

const { Schema, model } = mongoose

type BackgroundType = {
    name: string,
    description: string,
    skills: [SkillsType, SkillsType]
}

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
        type: [Skills, Skills],
        required: true
    }
})

const Background = model<BackgroundType>('Background', background)

export { BackgroundType, Background }