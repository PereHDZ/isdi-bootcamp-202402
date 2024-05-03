import mongoose from 'mongoose'

import { Cantrip } from '../models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => Cantrip.deleteMany())
        .then(() => 
            Promise.all([
                Cantrip.create({ name: 'Acid Splash', description: 'Throw a bubble of acid that damages each creature it hits.' }),
                Cantrip.create({ name: 'Blade Ward', description: 'Take only half of the damage from Bludgeoning, Piercing, and Slashing attacks.' }),
                Cantrip.create({ name: 'Bone Chill', description: 'Prevent the target from healing until your next turn. An undead target receives Disadvantage on Attack Rolls.' }),
                Cantrip.create({ name: 'Dancing Lights', description: 'Illuminate a 9m radius.' }),
                Cantrip.create({ name: 'Eldritch Blast', description: 'Conjure a beam of crackling energy.' }),
                Cantrip.create({ name: 'Fire Bolt', description: 'Hurl a mote of fire.' }),
                Cantrip.create({ name: 'Friends', description: 'Gain Advantage on Charisma Checks against a non-hostile creature.   This spell can be cast while you are Silenced.' }),
                Cantrip.create({ name: 'Mage Hand', description: 'Create an invisible spectral hand that can manipulate and interact with objects.' }),
                Cantrip.create({ name: 'Guidance', description: 'The target gains a +1d4 bonus to Ability Checks.' }),
                Cantrip.create({ name: 'Light', description: 'Infuse an object with an aura of light.' }),
                Cantrip.create({ name: 'Minor Illusion', description: 'Create an illusion that compels nearby creatures to investigate. You can remain hidden while casting this spell. This spell can be cast while you are Silenced' }),
                Cantrip.create({ name: 'Poison Spray', description: 'Project a puff of noxious gas' }),
                Cantrip.create({ name: 'Produce Flame', description: 'A flame in your hand sheds a light in a 9m radius and deals 1~8 Fire damage damage when thrown. Throwing the flame immediately after you conjure it does not cost an action. Extinguishing or throwing it on subsequent turns costs an action.' }),
                Cantrip.create({ name: 'Ray of Frost', description: "Reduce the target's movement speed by 3m." }),
                Cantrip.create({ name: 'Resistance', description: 'Make a target more resistant to spell effects and conditions: it receives a +1d4 bonus to Saving Throws.' }),
                Cantrip.create({ name: 'Sacred Flame', description: 'Engulf a target in a flame-like radiance' }),
                Cantrip.create({ name: "Selûne's Dream", description: 'An ally you touch regains 1d8 hit points, but potentially falls into a slumber.' }),
                Cantrip.create({ name: "Shield", description: 'When you are about to be hit by an enemy, use your Reaction to increase your Armour Class Armour Class by 5. You also take no damage from Magic Missile. These effects last until the start of your next turn.' }),
                Cantrip.create({ name: 'Shillelagh', description: "Your staff or club becomes magical: it deals 1d8 + WIS Bludgeoning damage and uses your Spellcasting Ability for Attack Rolls" }),
                Cantrip.create({ name: 'Shocking Grasp', description: 'The target cannot use reactions. This spell has Advantage on creatures wearing metal armour.' }),
                Cantrip.create({ name: 'Thaumaturgy', description: 'Gain Advantage on Intimidation and Performance Checks.' }),
                Cantrip.create({ name: 'Thorn Whip', description: "Pulls the creature 3m closer to you.The target can't be pulled if it is Huge in size." }),
                Cantrip.create({ name: 'True Strike', description: "Gain Advantage on your next Attack Roll." }),
                Cantrip.create({ name: 'Vicious Mockery', description: "Insult a creature: it has Disadvantage on its next Attack Roll." }),
            ])
        )
        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(console.error)