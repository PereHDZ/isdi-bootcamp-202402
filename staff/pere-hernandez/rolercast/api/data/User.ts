import mongoose from 'mongoose'

const { Schema, model } = mongoose

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

const User = model<UserType>('User', user)

export { UserType, User }