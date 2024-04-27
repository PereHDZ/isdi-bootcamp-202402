import mongoose from 'mongoose'

const { Schema, model } = mongoose

type FeyAncestryType = {
    name: string,
    bonusesDesription: [string],
}

const feyAncestry = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const FeyAncestry = model<FeyAncestryType>('FeyAncestry', feyAncestry)

export { FeyAncestry, FeyAncestryType}