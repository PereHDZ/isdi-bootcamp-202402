import mongoose, { ObjectId } from "mongoose"

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    username: string
    email: string
    password: string
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
    }
})

type PostType = {
    author: ObjectId
    image: string
    comment: string
    date: Date
}

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    deta: {
        type: Date,
        required: true
    }
})

const User = model<UserType>('User', user)
const Post = model<PostType>('Post', post)

export {
    UserType,
    User,

    PostType,
    Post
}