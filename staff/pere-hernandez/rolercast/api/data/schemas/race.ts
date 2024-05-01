import mongoose, { ObjectId } from 'mongoose'
import { features, proficiencies } from './index.ts'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

const race = new Schema ({
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
    speed: {
        type: Number,
        required: false
    },
    features: {
        type: features,
        required: false
    },
    proficiencies: {
        type: proficiencies,
        required: false
    },
    parent: {
        type: ObjectId,
        ref: 'Race',
        required: false
    }
})

export default race