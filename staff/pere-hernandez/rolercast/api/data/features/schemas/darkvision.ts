import mongoose from 'mongoose'

import { DarkvisionType } from '../types'

const { Schema } = mongoose

const darkvision = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    darkVisionRange: {
        type: Number,
        required: true
    }
})

export default darkvision