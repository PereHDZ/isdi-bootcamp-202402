import mongoose from 'mongoose'

import { Proficiencies, Features, Race, Weapons, Armour, Skills } from '../data/models'
import { DraconicAncestry, HumanVersatility, FeyAncestry, Darkvision, SuperiorDarkvision } from './features/models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => Race.deleteMany())
        .then(() => 
            Promise.all([
                Race.create({ name: 'Dragonborn', description: 'A proud race that values clan and skills above all else. Once enslaved by dragons, they strive to be self-sufficient, not wanting to be beholden to anyone, not even the gods.', speed: 9, features: new Features({draconicAncestry: new DraconicAncestry({name: 'Draconic Ancestry', bonusesDescription: ['You are distantly related to a particular kind of dragon. This determines the damage and area of your breath weapon, and the type of resistance you gain.']})})}),
            ])
        )

        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(console.error)