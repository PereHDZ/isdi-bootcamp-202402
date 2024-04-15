import registerUser from "./registerUser.ts"
import authenticateUser from "./authenticateUser.ts"
import retrieveUser from "./retrieveUser.ts"

import createPost from "./createPost.ts"
import retrievePosts from "./retrievePosts.ts"


const logic = {
    users: null,
    posts: null,

    registerUser,
    authenticateUser,
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