import mongoose from 'mongoose'

import { CharacterClass } from '../models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => CharacterClass.deleteMany())
    .then(() => 
        Promise.all([
            CharacterClass.create({ name: 'Barbarian', description: 'The strong embrace the wild that hides inside - keen instincts, primal physicality, and most of all, an unbridled, unquenchable rage', hp: 12 }),
            CharacterClass.create({ name: 'Bard', description: 'You know music is more than a fancy - it is power. Through study and adventure, you have mastered song, speech, and the magic within.', hp: 8 }),
            CharacterClass.create({ name: 'Cleric', description: 'Clerics are representatives of the gods they worship, wielding potent divine magic for good or ill.', hp: 8 }),
            CharacterClass.create({ name: 'Druid', description: 'Druids channel the elemental forces of nature and share a deep kinship with animals. Mastery of Wild Shape allows them to transform into beasts from all over the Realms.', hp: 8 }),
            CharacterClass.create({ name: 'Fighter', description: 'Fighters have mastered the art of combat, wielding weapons with unmatched skill and wearing armour like a second skin.', hp: 10 }),
            CharacterClass.create({ name: 'Monk', description: 'Channel your cosmic enlightenment by deftly dodging and efficiently disassembling your foes through stunning strikes and a whirlwind of martial art attacks.', hp: 8 }),
            CharacterClass.create({ name: 'Paladin', description: 'Fuelled by the Oath you swore to uphold justice and righteousness, you are a beacon of hope in dark times.', hp: 10 }),
            CharacterClass.create({ name: 'Ranger', description: 'Rangers are unrivalled scouts and trackers, honing a deep connection with nature in order to hunt their favoured prey.', hp: 10 }),
            CharacterClass.create({ name: 'Rouge', description: "With stealth, skill, and uncanny reflexes, a rogue's versatility lets them get the upper hand in almost any situation.", hp: 8 }),
            CharacterClass.create({ name: 'Sorcerer', description: 'Sorcerers are natural spellcasters, drawing on inherent magic from a gift or bloodline.', hp: 6 }),
            CharacterClass.create({ name: 'Warlock', description: 'Bound by a pact to an all-powerful patron, Warlocks trade their loyalty for supernatural abilities and unique magic.', hp: 8 }),
            CharacterClass.create({ name: 'Wizard', description: 'Wizards master the arcane by specialising in individual schools of magic, combining ancient spells with modern research.', hp: 6 })
        ])
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)