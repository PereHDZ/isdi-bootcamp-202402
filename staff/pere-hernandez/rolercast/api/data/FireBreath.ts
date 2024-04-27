import mongoose from 'mongoose'

const { Schema, model } = mongoose

type FireBreathType = {
    name: string,
    bonusesDescription: [string]
}

const fireBreath = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const FireBreath = model<FireBreathType>('FireBreath', fireBreath)

export { FireBreathType, FireBreath }