import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type AdditionalSpellType = {
    name: string,
    description: string,
    cantrip: ObjectId
}

const additionalSpell = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: String,
        required: true
    },
    spell: {
        type: ObjectId,
        required: true
    }

})

const AdditionalSpell = model<AdditionalSpellType>('AdditionalSpell', additionalSpell)

export { AdditionalSpellType, AdditionalSpell }