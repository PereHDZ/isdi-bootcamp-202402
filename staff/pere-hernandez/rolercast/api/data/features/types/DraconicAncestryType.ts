import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type DraconicAncestryType = {
    name: string,
    bonusesDescription: string,
    raceAction?: ObjectId
}

export default DraconicAncestryType