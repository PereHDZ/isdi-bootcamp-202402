import mongoose, { ObjectId } from 'mongoose'

import { Archetype, Armour, Proficiencies, Skills } from '../models'

const { Types: { ObjectId } } = mongoose

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => Archetype.deleteMany())
    .then(() => 
        Promise.all([
            Archetype.create({ 
                name: 'Bounty Hunter', 
                description: 'Gain Proficiency in Investigation. Creatures you hit with Ensnaring Strike (either ranged or melee) have Disadvantage on their Saving Throw.',
                proficiencies: new Proficiencies({ skills: new Skills({ investigation: 1 }) }),
            }),                    
            Archetype.create({ 
                name: 'Keeper of the Veil', 
                description: 'You specialise in hunting creatures from other planes of existence. You gain Proficiency in Arcana and can grant protection against aberrations, celestials, elementals, fey, fiends, and undead.',
                proficiencies: new Proficiencies({ skills: new Skills({ arcana: 1}) }),
                knownCantrip: new ObjectId('66335a87863710c59eae0f69')
            }),
            Archetype.create({ 
                name: 'Mage Breaker', 
                description: 'You have a history of battling spellcasters. Gain Proficiency with Arcana and True Strike, which gives you Advantage on Attack Rolls against a creature. Wisdom is your Spellcasting Ability for this spell.',
                proficiencies: new Proficiencies({ skills: new Skills({ arcana: 1}) }),
                knownSpell: new ObjectId('66354088b3c877f621450015')
            }),
            Archetype.create({ 
                name: 'Ranger Knight', 
                description: 'You have sworn to serve a crown or nation and seek to bring its foes to ruin. Gain Proficiency with History and Proficiency with Heavy Armour.',
                proficiencies: new Proficiencies({ armour: new Armour({ heavyArmour: 1 }), skills: new Skills({ history: 1 }) })
            }),
            Archetype.create({ 
                name: 'Sanctified Stalker', 
                description: 'You swore to hunt the enemies of a holy or druidic order. Gain Proficiency with Religion and the Sacred Flame Cantrip, which deals 1d8Damage Radiant damage. Wisdom is your Spellcasting Ability for the Cantrip.',
                proficiencies: new Proficiencies({ skills: new Skills({ religion: 1 }) }),
                knownCantrip: new ObjectId('66354088b3c877f62145000e')
            })
        ])
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)