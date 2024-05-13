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

import retrieveAction from './retrieveAction.js'

import retrieveBackgrounds from './retrieveBackgrounds.js'
import retrieveBackground from './retrieveBackground.js'

import retrieveCantrip from './retrieveCantrip.js'
import retrieveSpell from './retrieveSpell.js'

import retrieveDeities from './retrieveDeities.js'
import retrieveDeity from './retrieveDeity.js'

import retrieveFightingStyles from './retrieveFightingStyles.js'
import retrieveFightingStyle from './retrieveFightingStyle.js'

import retrieveArchetypes from './retrieveArchetypes.js'
import retrieveArchetype from './retrieveArchetype.js'

import retrieveNaturalExplorers from './retrieveNaturalExplorers.js'
import retrieveNaturalExplorer from './retrieveNaturalExplorer.js'

import createCharacter from './createCharacter.js'
import retrieveCharacters from './retrieveCharacters.js'

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

    retrieveAction,

    retrieveBackgrounds,
    retrieveBackground,

    retrieveCantrip,
    retrieveSpell,

    retrieveDeities,
    retrieveDeity,

    retrieveFightingStyles,
    retrieveFightingStyle,

    retrieveArchetypes,
    retrieveArchetype,

    retrieveNaturalExplorer,
    retrieveNaturalExplorers,

    createCharacter,
    retrieveCharacters
}

export default logic