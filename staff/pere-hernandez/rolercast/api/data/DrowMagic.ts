import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type DrowMagicType = {
    name: string,
    description: string,
    cantrip: ObjectId
}

const drowMagic = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    cantrip: {
        type: ObjectId,
        required: true
    }

})

const DrowMagic = model<DrowMagicType>('DrowMagic', drowMagic)

export { DrowMagicType, DrowMagic }