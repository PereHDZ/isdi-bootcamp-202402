import mongoose from 'mongoose'

const { Schema, model } = mongoose

type ArmourType = {
    lightArmour?: number,
    mediumArmour?: number,
    heavyArmour?: number,
    shields?: number
}

const armour = new Schema ({
    lightArmour: {
        type: Number,
        required: false
    },
    mediumArmour: {
        type: Number,
        required: false
    },
    heavyArmour: {
        type: Number,
        required: false
    },
    shields: {
        type: Number,
        required: false
    }
})

const Armour = model<ArmourType>('Armour', armour)

export { ArmourType, Armour }