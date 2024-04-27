import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type DuergarMagicType = {
    name: string,
    description: string,
    cantrip: ObjectId
}

const duergarMagic = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
})

const DuergarMagic = model<DuergarMagicType>('DuergarMagic', duergarMagic)

export { DuergarMagicType, DuergarMagic }