import mongoose, { ObjectId, isObjectIdOrHexString } from 'mongoose'
import { Features, FeaturesType, Proficiencies, ProficienciesType } from './index'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type RaceType = {
    name: string,
    description: string,
    speed?: number,
    features?: FeaturesType,
    proficiencies?: ProficienciesType,
    parent?: ObjectId
}

const race = new Schema ({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String, 
        required: true,
        unique: true
    },
    speed: {
        type: Number,
        required: false
    },
    features: {
        type: Features,
        required: false
    },
    proficiencies: {
        type: Proficiencies,
        required: false
    },
    parent: {
        type: ObjectId,
        required: false
    }
})

const Race = model<RaceType>('Race', race)

export {Race, RaceType}