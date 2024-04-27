import mongoose from 'mongoose'

const { Schema, model } = mongoose

type DwarvenToughnessType = {
    name: string,
    bonusesDescription: [string],
    hitPointCount: number
}

const dwarvenToughness = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    hitPointCount: {
        type: Number,
        required: true
    }
})

const DwarvenToughness = model<DwarvenToughnessType>('DwarvenToughness', dwarvenToughness)

export { DwarvenToughnessType, DwarvenToughness }