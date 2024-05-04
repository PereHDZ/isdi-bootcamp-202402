import mongoose from 'mongoose'

import { ClassAction } from '../models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => ClassAction.deleteMany())
        .then(() => 
            Promise.all([
                ClassAction.create({ name: 'Rage', description: "While Raging, you gain the following: Resistance against physical damage, Deal extra melee and thrown damage Advantage on Strength checks and saving throws. Your rage lasts for 10 turns and ends early if you haven't attacked a creature or been attacked or you decide to end your Rage. You cannot cast spells or concentrate while raging." }),
                ClassAction.create({ name: 'Unarmoured Defence: Barbarian', description: 'When not wearing armour, add your Constitution modifier to your Armour Class in addition to your Dexterity modifier.' }),
                ClassAction.create({ name: 'Bardic Inspiration', description: 'Inspire an ally to go beyond their capabilities with your performance. They can add a D6 +1d6 bonus to their next Attack Roll, Ability Check, or Saving Throw.' }),
                ClassAction.create({ name: 'Musical Instrument Proficiency', description: 'You know how to play a variety of musical instruments and are able to entertain a crowd with them.' }),
                ClassAction.create({ name: 'Starting Instrument', description: "Pick the instrument you'd like to use. It will influence the soundscape when you cast spells, and can be changed later by equipping a different instrument." }),
                ClassAction.create({ name: 'Second Wind', description: 'Draw on your stamina to protect yourself. Once per short rest, you can regain 1d10 + Fighter Level hit points.' }),
                ClassAction.create({ name: 'Ki Points: 2', description: 'You can spend these points to fuel various Monk abilities. Replenishes on a short or long rest' }),
                ClassAction.create({ name: 'Martial Arts: Dextrous Attacks', description: 'Attacks with Monk Weapons and unarmed attacks scale with your Dexterity instead of your Strength if your Dexterity is higher.' }),
                ClassAction.create({ name: 'Martial Arts: Deft Strikes', description: 'Attacks with Monk Weapons and unarmed attacks deal 1d4 Bludgeoning damage, unless their normal damage is higher.' }),
                ClassAction.create({ name: 'Martial Arts: Bonus Unarmed Strike', description: 'After making an attack with a Monk Weapon or while unarmed, you can make another unarmed attack as a  Bonus action.' }),
                ClassAction.create({ name: 'Unarmoured Defence', description: 'Your reflexes are as effective as any armour. While not wearing armour, you add your Wisdom Modifier to your Armour Class. This feature does not combine with Mage Armour, nor the Barbarian version of Unarmoured Defence (Barbarian).' }),
                ClassAction.create({ name: 'Flurry of Blows', description: 'Using a  Bonus action and a Ki Point, punch twice in quick succession. Equivalent to two normal unarmed attacks.' }),
                ClassAction.create({ name: 'Flurry of Blows', description: 'Using a  Bonus action and a Ki Point, punch twice in quick succession. Equivalent to two normal unarmed attacks.' }),
                ClassAction.create({ name: 'Divine Sense', description: 'Expend a Bonus action to gain Advantage on Attack Rolls against celestials, fiends, and undead. ( Recharge: Short rest )' }),
                ClassAction.create({ name: 'Lay on Hands', description: 'Use your blessed touch to heal a creature (2 x level for one charge or 4 x level for two charges) or cure it of all diseases and poisons.' }),
                ClassAction.create({ name: 'Lay on Hands', description: 'Use your blessed touch to heal a creature (2 x level for one charge or 4 x level for two charges) or cure it of all diseases and poisons.' }),
                ClassAction.create({ name: 'Expertise', description: 'Gain Expertise (double your Proficiency Bonus) in 2 Skills you are Proficient in.' }),
                ClassAction.create({ name: 'Sneak Attack (Ranged)', description: 'Once per turn, you can deal an extra 1d6 damage to an enemy you have Advantage on, or have an ally next to. You must have a Ranged weapon equipped. As you gain levels in Rogue, this damage will go up by adding more d6 dice.' }),
                ClassAction.create({ name: 'Pact Magic', description: "Warlock spell slots (also known as 'pact slots') are not like those of other spellcasters. Warlock spell slots are equal to the highest level of Spells the Warlock has access to. Casting a lower level Spell will always 'upcast' it to the highest level available. Warlocks have a very limited number of spell slots, but also regain those slots by taking a Short Rest or Long Rest. As a result, Warlocks can cast fewer Spells per battle than other spellcasters, but also more high level Spells per day." }),
                ClassAction.create({ name: 'Spell Scribing', description: 'A Wizard who finds a Scroll for a Spell they do not know may permanently copy that Spell to their Spellbook at the cost of the scroll and 50gp per level of the Spell.' }),
                ClassAction.create({ name: 'Arcane Recovery', description: 'Once per day out of combat, you can recover expended Spell Slots.' }),
            ])
        )
        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(console.error)