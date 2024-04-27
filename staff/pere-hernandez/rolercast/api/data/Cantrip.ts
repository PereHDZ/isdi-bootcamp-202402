import mongoose from 'mongoose'

const { Schema, model } = mongoose

type CantripType = {
    name: string,
    description: string
}

const cantrip = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    description: {
        type: String,
        required: true
    }
})

const Cantrip = model<CantripType>('Cantrip', cantrip)

export { CantripType, Cantrip }