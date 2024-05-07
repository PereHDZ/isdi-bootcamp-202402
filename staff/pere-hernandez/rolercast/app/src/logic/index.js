import registerUser from './registerUser.js'
import loginUser from './loginUser.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import logoutUser from './logoutUser.js'

import retrieveUser from './retrieveUser.js'
import retrieveRaces from './retrieveRaces.js'
import retrieveRace from './retrieveRace.js'
import retrieveParentRaces from './retrieveParentRaces.js'
import retrieveSubracesFromRace from './retrieveSubracesFromParent.js'

import retrieveCharacterClasses from './retrieveCharacterClasses.js'
import retrieveCharacterClass from './retrieveCharacterClass.js'
import retrieveParentCharacterClasses from './retrieveParentCharacterClasses.js'
import retrieveSubclassesFromClass from './retrieveSubclassesFromParent.js'

import retrieveBackgrounds from './retrieveBackgrounds.js'
import retrieveBackground from './retrieveBackground.js'

import retrieveCantrip from './retrieveCantrip.js'

import retrieveDeities from './retrieveDeities.js'

const logic = { 
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    
    retrieveUser,
    retrieveRaces,
    retrieveRace,
    retrieveParentRaces,
    retrieveSubracesFromRace,

    retrieveCharacterClasses,
    retrieveCharacterClass,
    retrieveParentCharacterClasses,
    retrieveSubclassesFromClass,

    retrieveBackgrounds,
    retrieveBackground,

    retrieveCantrip,

    retrieveDeities
}

export default logic