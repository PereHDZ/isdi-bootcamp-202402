import mongoose from 'mongoose'

const { Schema, model } = mongoose

type StoneCamuflageType = {
    name: string,
    bonusesDescription: [string]
}

const stoneCamuflage = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const StoneCamuflage = model<StoneCamuflageType>('StoneCamuflage', stoneCamuflage)

export { StoneCamuflageType, StoneCamuflage }