import mongoose from 'mongoose'

const { Schema, model } = mongoose

type RelentlessEnduranceType = {
    name: string,
    bonusesDescription: [string]
}

const relentlessEndurance = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const RelentlessEndurance = model<RelentlessEnduranceType>('RelentlessEndurance', relentlessEndurance)

export { RelentlessEnduranceType, RelentlessEndurance }