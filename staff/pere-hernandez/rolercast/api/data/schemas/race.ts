import mongoose, { ObjectId } from 'mongoose'
import { features, proficiencies } from '.'

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
        required: false
    }
})

export default race