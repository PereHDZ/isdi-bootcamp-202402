import mongoose, { ObjectId } from 'mongoose'

const { Schema } = mongoose

const { Types: { ObjectId } } = Schema

type DrowMagicType = {
    name: string,
    description: string,
    cantrip: ObjectId
}

export default DrowMagicType