import registerUser from "./registerUser"
import loginUser from "./loginUser"
import checkLoggedStatus from "./checkLoggedStatus"
import logoutUser from "./logoutUser"
import getLoggedInUserId from "./getLoggedInUserId"
import retrieveUser from "./retrieveUser"
import createPost from "./createPost"
import retrievePosts from "./retrievePosts"

const logic = {
    registerUser,
    loginUser,
    checkLoggedStatus,
    logoutUser,
    getLoggedInUserId,
    retrieveUser,

    createPost,
    retrievePosts
}

export default logic