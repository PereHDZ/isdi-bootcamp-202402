import mongoose from 'mongoose'

const { Schema, model } = mongoose

type StrongheartResilienceType = {
    name: string,
    bonusesDescription: [string]
}

const strongheartResilience = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const StrongheartResilience = model<StrongheartResilienceType>('StrongheartResilience', strongheartResilience)

export { StrongheartResilienceType, StrongheartResilience }