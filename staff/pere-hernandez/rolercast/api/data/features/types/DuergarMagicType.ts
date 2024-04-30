import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type DuergarMagicType = {
    name: string,
    description: string,
    cantrip: ObjectId
}

export default DuergarMagicType