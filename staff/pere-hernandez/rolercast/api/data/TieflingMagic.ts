import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type TieflingMagicType = {
    name: string,
    bonusesDescription: [string],
    cantrip?: ObjectId
}

const tieflingMagic = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    },
    cantrip: {
        type: ObjectId,
        required: false
    }
})

const TieflingMagic = model<TieflingMagicType>('TieflingMagic', tieflingMagic)

export { TieflingMagicType, TieflingMagic }