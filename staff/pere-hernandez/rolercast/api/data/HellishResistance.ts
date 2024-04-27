import mongoose from 'mongoose'

const { Schema, model } = mongoose

type HellishResistanceType = {
    name: string,
    bonusesDescription: [string]
}

const hellishResistance = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const HellishResistance = model<HellishResistanceType>('HellishResistance', hellishResistance)

export { HellishResistanceType, HellishResistance }