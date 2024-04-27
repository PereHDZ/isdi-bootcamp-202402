import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type GithyankiPsionicsType = {
    name: string,
    bonusesDescription: [string],
    cantrip: ObjectId
}

const githyankiPsionics = new Schema ({
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
        required: true
    }

})

const GithyankiPsionics = model<GithyankiPsionicsType>('GithyankiPsionics', githyankiPsionics)

export { GithyankiPsionicsType, GithyankiPsionics }