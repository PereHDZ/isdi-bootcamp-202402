import Collection from "./Collection.mjs"

const data = {
    users: new Collection('users'),
    posts: new Collection('posts'),
    chats: new Collection('chats')
}

export default data