import mongoose from 'mongoose'

const { Schema, model } = mongoose

type GnomeCunningType = {
    name: string,
    bonusesDescription: [string]
}

const gnomeCunning = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const GnomeCunning = model<GnomeCunningType>('GnomeCunning', gnomeCunning)

export { GnomeCunningType, GnomeCunning }