import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import retrieveRaces from './retrieveRaces.ts'

const logic = {
    users: null,
    races: null,

    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveRaces
}

export default logic