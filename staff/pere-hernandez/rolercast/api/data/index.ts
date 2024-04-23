import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    username: string
    email: string
    password: string
    avatar: string
}

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
})

type RaceType = {
    name: string,
    description: string
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
    }
})

const User = model<UserType>('User', user)
const Race = model<RaceType>('Race', race)

export {
    UserType,
    User,
    RaceType,
    Race
}

