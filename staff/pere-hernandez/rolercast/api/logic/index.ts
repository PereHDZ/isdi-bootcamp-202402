import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'

import retrieveRaces from './retrieveRaces.ts'
import retrieveRace from './retrieveRace.ts'
import retrieveParentRaces from './retrieveParentRaces.ts'
import retrieveSubracesFromRace from './retrieveSubracesFromRace.ts'

import retrieveCharacterClasses from './retrieveCharacterClasses.ts'
import retrieveCharacterClass from './retrieveCharacterClass.ts'
import retrieveParentCharacterClasses from './retrieveParentCharacterClasses.ts'
import retrieveSubclassesFromClass from './retrieveSubclassesFromClass.ts'

import retrieveBackgrounds from './retrieveBackgrounds.ts'
import retrieveBackground from './retrieveBackground.ts'

const logic = {
    users: null,
    races: null,
    characterClasses: null,

    registerUser,
    authenticateUser,
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
    retrieveBackground
}

export default logic