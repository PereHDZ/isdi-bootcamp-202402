import mongoose from 'mongoose'

import { FightingStyle } from '../models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => FightingStyle.deleteMany())
        .then(() => 
            Promise.all([
                FightingStyle.create({ name: 'Archery', description: 'You gain a +2 bonus to Ranged Weapon attack rolls.' }),
                FightingStyle.create({ name: 'Defence', description: 'You gain a +1 bonus to Armour Class while wearing Armour.' }),
                FightingStyle.create({ name: 'Dueling', description: 'When you are wielding a melee weapon that is not Two-Handed or Versatile in one hand, and no weapon in the other hand, you gain a +2 bonus to damage rolls with that weapon, increasing your chance to do heavy damage.' }),
                FightingStyle.create({ name: 'Great Weapon Fighting', description: 'When you roll a 1 or 2 on a damage die for an attack with a Two-Handed melee weapon, that die is rerolled once.'}),
                FightingStyle.create({ name: 'Protection', description: 'When you have a Shield, impose Disadvantage on an enemy who attacks one of your allies when you are within  1.5m / 5ft. You must be able to see the enemy. (This is a reaction. Toggle a reaction during your turn. It will automatically execute when needed.)' }),
                FightingStyle.create({ name: 'Two-Weapon Fighting', description: 'When you make an offhand attack, you can add your Ability Modifier to the damage of the attack.' })
            ])
        )
        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(console.error)