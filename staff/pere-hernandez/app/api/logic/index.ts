import registerUser from "./registerUser.ts"
import loginUser from "./loginUser.ts"
import logoutUser from "./logoutUser.ts"
import retrieveUser from "./retrieveUser.ts"

import createPost from "./createPost.ts"
import retrievePosts from "./retrievePosts.ts"


const logic = {
    users: null,
    posts: null,

    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,

    createPost,
    retrievePosts/*,
    deletePost: deletePost,
    updatePost: updatePost,
    
    createChat: createChat,
    addMessageToChat: addMessageToChat,
    retrieveMessagesWith: retrieveMessagesWith,
    retrieveChatWith: retrieveChatWith,

    createMessage: createMessage*/
}

export default logic