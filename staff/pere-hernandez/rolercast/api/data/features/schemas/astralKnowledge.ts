import mongoose from 'mongoose'
import { AstralKnowledgeType } from '../types'

const { Schema, model } = mongoose

const astralKnowledge = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

export default astralKnowledge