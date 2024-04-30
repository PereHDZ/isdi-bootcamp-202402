import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type GithyankiPsionicsType = {
    name: string,
    bonusesDescription: [string],
    cantrip: ObjectId
}

export default GithyankiPsionicsType