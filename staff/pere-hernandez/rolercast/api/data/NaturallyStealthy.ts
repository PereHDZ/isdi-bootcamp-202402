import mongoose from 'mongoose'

const { Schema, model } = mongoose

type NaturallyStealthyType = {
    name: string,
    bonusesDescription: [string]
}

const naturallyStealthy = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const NaturallyStealthy = model<NaturallyStealthyType>('NaturallyStealthy', naturallyStealthy)

export { NaturallyStealthyType, NaturallyStealthy }