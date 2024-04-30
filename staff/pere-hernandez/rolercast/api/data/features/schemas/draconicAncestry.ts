import mongoose from 'mongoose'

import { DraconicAncestryType } from '../types'

const { Schema } = mongoose

const draconicAncestry = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    }
})

export default draconicAncestry