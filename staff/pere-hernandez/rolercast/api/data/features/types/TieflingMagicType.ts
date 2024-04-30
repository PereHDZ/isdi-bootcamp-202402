import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type TieflingMagicType = {
    name: string,
    bonusesDescription: string,
    cantrip?: ObjectId
}

export default TieflingMagicType