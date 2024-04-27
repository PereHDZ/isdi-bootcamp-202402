import mongoose from 'mongoose'

const { Schema, model } = mongoose

type DraconicAncestryType = {
    name: string,
    bonusesDescription: [string]
}

const draconicAncestry = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const DraconicAncestry = model<DraconicAncestryType>('DraconicAncestry', draconicAncestry)

export { DraconicAncestryType, DraconicAncestry }