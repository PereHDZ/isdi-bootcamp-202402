import registerUser from './registerUser.js'
import loginUser from './loginUser.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import logoutUser from './logoutUser.js'
import retrieveUser from './retrieveUser.js'
import retrieveRaces from './retrieveRaces.js'

const logic = { 
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    retrieveUser,
    retrieveRaces
}

export default logic