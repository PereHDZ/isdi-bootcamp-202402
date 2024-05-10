import mongoose, { ObjectId } from 'mongoose'

import { Armour, CharacterClass, Proficiencies, SavingThrowProficiencies, Skills, Spellcasting, Weapons } from '../models'

const { Types: { ObjectId } } = mongoose

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => CharacterClass.deleteMany())
    .then(() => 
        Promise.all([
            CharacterClass.create({ 
                name: 'Barbarian',
                description: 'The strong embrace the wild that hides inside - keen instincts, primal physicality, and most of all, an unbridled, unquenchable rage', 
                hp: 12,
                hpPerLevel: 7, 
                keyAbilities: ['Strength for improved attack rolls and damage with melee weapons.', 'Dexterity for higher initiative and Armour Class', 'Constitution for more hit points and unarmoured Armour Class.'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ strength: 1, constitution: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, flails: 1, morningstars: 1, rapiers: 1, scimitars: 1, shortSwords: 1, warPicks: 1, battleAxes: 1, longSwords: 1, tridents: 1, warHammers: 1, glaives: 1, greatAxes: 1, halberds: 1, greatSwords: 1, mauls: 1, pikes: 1, handCrossbows: 1, heavyCrossbows: 1, longbows: 1 }), 

                    armour: new Armour({ lightArmour: 1, mediumArmour: 1, shields: 1 }), 

                    skills: new Skills({ animalHandling: 0, athletics: 0, intimidation: 0, nature: 0, survival: 0, perception: 0 }) }),
                skillCount: 2,
                spellcastingAbility: 'Charisma for the effective use of items, scrolls, and equipment.', 
                classActions: [new ObjectId('663755d85297ed4f922e3a52'), new ObjectId('663755d85297ed4f922e3a53')] }),
                
            CharacterClass.create({ 
                name: 'Bard', 
                description: 'You know music is more than a fancy - it is power. Through study and adventure, you have mastered song, speech, and the magic within.', 
                hp: 8, 
                hpPerLevel: 5, 
                keyAbilities: ["Charisma for improved spell's DC and Attack Rolls with spells.", 'Constitution for more Hit Points and better Concentration checks.', 'Dexterity for higher Initiative and Armour Class.'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ dexterity: 1, charisma: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, handCrossbows: 1, rapiers: 1, longSwords: 1, shortSwords: 1 }),
                    
                    armour: new Armour({ lightArmour: 1 }),

                    skills: new Skills({ history: 0, insight: 0, medicine: 0, persuasion: 0, religion: 0, deception: 0, intimidation: 0, performance: 0, acrobatics: 0, sleightOfHand: 0, stealth: 0, animalHandling: 0, arcana: 0, investigation: 0, athletics: 0, nature: 0, perception: 0, survival: 0 }) }),                    
                skillCount: 3,
                spellcastingAbility: 'Charisma', 
                spellcasting: new Spellcasting({ 
                    cantripCount: 2, 
                    availableCantrips: [new ObjectId('66354088b3c877f621450000'), new ObjectId('66354088b3c877f621450006'),new ObjectId('66354088b3c877f621450015'), new ObjectId('66354088b3c877f621450005'), new ObjectId('66354088b3c877f621450002'), new ObjectId('66354088b3c877f621450008'), new ObjectId('66354088b3c877f621450009'), new ObjectId('66354088b3c877f621450016')], 

                    spellCount: 4, 
                    availableSpells: [new ObjectId('66335a87863710c59eae0f3b'), new ObjectId('66335a87863710c59eae0f3e'),new ObjectId('66335a87863710c59eae0f41'), new ObjectId('66335a87863710c59eae0f4d'), new ObjectId('66335a87863710c59eae0f4e'), new ObjectId('66335a87863710c59eae0f4f'), new ObjectId('66335a87863710c59eae0f54'), new ObjectId('66335a87863710c59eae0f56'), new ObjectId('66335a87863710c59eae0f5d'), new ObjectId('66335a87863710c59eae0f5f'),new ObjectId('66335a87863710c59eae0f65'), new ObjectId('66335a87863710c59eae0f6f'), new ObjectId('66335a87863710c59eae0f70'), new ObjectId('66335a87863710c59eae0f71'), new ObjectId('66335a87863710c59eae0f73')] }), 
                classActions: [new ObjectId('663755d85297ed4f922e3a54'), new ObjectId('663755d85297ed4f922e3a55'), new ObjectId('663755d85297ed4f922e3a56'),] }),

            CharacterClass.create({ 
                name: 'Cleric', 
                description: 'Clerics are representatives of the gods they worship, wielding potent divine magic for good or ill.',
                hp: 8, 
                hpPerLevel: 5, 
                keyAbilities: ['Wisdom for Spells.','Constitution for Hit Points and Concentration Checks.','Dexterity for Armour Class.' ], 
                savingThrowProficiencies: new SavingThrowProficiencies({ wisdom: 1, charisma: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, flails: 1, morningstars: 1 }),
                    
                    armour: new Armour({ lightArmour: 1, mediumArmour: 1, shields: 1 }), 
                    
                    skills: new Skills({ history: 0, insight: 0, medicine: 0, persuasion: 0, religion: 0 }) }),
                skillCount: 2,                    
                spellcastingAbility: 'Wisdom', 
                spellcasting: new Spellcasting({ 
                    cantripCount: 3, 
                    availableCantrips: [new ObjectId('66354088b3c877f621450000'), new ObjectId('66354088b3c877f621450007'), new ObjectId('66354088b3c877f621450008'), new ObjectId('66354088b3c877f62145000b'), new ObjectId('66354088b3c877f62145000d'), new ObjectId('66354088b3c877f62145000e'), new ObjectId('66354088b3c877f621450013')], 
                    
                    spellCount: 2, 
                    availableSpells: [new ObjectId('66335a87863710c59eae0f3e'), new ObjectId('66335a87863710c59eae0f3f'),new ObjectId('66335a87863710c59eae0f4a'), new ObjectId('66335a87863710c59eae0f4c'), new ObjectId('66335a87863710c59eae0f4d'), new ObjectId('66335a87863710c59eae0f5b'), new ObjectId('66335a87863710c59eae0f5d'), new ObjectId('66335a87863710c59eae0f63'), new ObjectId('66335a87863710c59eae0f69'), new ObjectId('66335a87863710c59eae0f6b'),new ObjectId('66335a87863710c59eae0f6e')] }) }),

            CharacterClass.create({ 
                name: 'Druid', 
                description: 'Druids channel the elemental forces of nature and share a deep kinship with animals. Mastery of Wild Shape allows them to transform into beasts from all over the Realms.', 
                hp: 8, 
                hpPerLevel: 5, 
                keyAbilities: ['Wisdom for Spells.','Constitution for Hit Points and Concentration Checks.','Dexterity for Armour Class.' ], 
                savingThrowProficiencies: new SavingThrowProficiencies({ wisdom: 1, intelligence: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, javelins: 1, maces: 1, quarterstaves: 1, scimitars: 1, sickles: 1, spears: 1 }), 

                    armour: new Armour({ lightArmour: 1, mediumArmour: 1, shields: 1 }), 
                    
                    skills: new Skills({ arcana: 0, animalHandling: 0, insight: 0, medicine: 0, nature: 0, perception: 0, religion: 0, survival: 0 }) }), 
                skillCount: 2,
                spellcastingAbility: 'Wisdom', 
                spellcasting: new Spellcasting({ 
                    cantripCount: 2, 
                    availableCantrips: [new ObjectId('66354088b3c877f621450007'), new ObjectId('66354088b3c877f62145000b'),new ObjectId('66354088b3c877f62145000a'), new ObjectId('66354088b3c877f62145000d'), new ObjectId('66354088b3c877f621450011'), new ObjectId('66354088b3c877f621450014')], 
                    
                    spellCount: 4, 
                    availableSpells: [new ObjectId('66335a87863710c59eae0f3b'), new ObjectId('66335a87863710c59eae0f41'),new ObjectId('66335a87863710c59eae0f4c'), new ObjectId('66335a87863710c59eae0f4d'), new ObjectId('66335a87863710c59eae0f64'), new ObjectId('66335a87863710c59eae0f52'), new ObjectId('66335a87863710c59eae0f54'), new ObjectId('66335a87863710c59eae0f58'), new ObjectId('66335a87863710c59eae0f59'), new ObjectId('66335a87863710c59eae0f5d'),new ObjectId('66335a87863710c59eae0f62'), new ObjectId('66335a87863710c59eae0f65'), new ObjectId('66335a87863710c59eae0f70'), new ObjectId('66335a87863710c59eae0f73')] }) }),

            CharacterClass.create({ 
                name: 'Fighter', 
                description: 'Fighters have mastered the art of combat, wielding weapons with unmatched skill and wearing armour like a second skin.', 
                hp: 10, 
                hpPerLevel: 6, 
                keyAbilities: ['Strength for physical attacks.', 'Dexterity for physical attacks with Finesse weapons, Armour Class (non- Heavy armour), and Initiative.', 'Constitution for Hit Points (and Concentration Checks for Eldritch Knights).', 'Intelligence for Spells (Eldritch Knight only).'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ strength: 1, constitution: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, flails: 1, morningstars: 1, rapiers: 1, scimitars: 1, shortSwords: 1, warPicks: 1, battleAxes: 1, longSwords: 1, tridents: 1, warHammers: 1, glaives: 1, greatAxes: 1, halberds: 1, greatSwords: 1, mauls: 1, pikes: 1, handCrossbows: 1, heavyCrossbows: 1, longbows: 1 }), 
                    
                    armour: new Armour({ lightArmour: 1, mediumArmour: 1, heavyArmour: 1, shields: 1 }), 
                    
                    skills: new Skills({ acrobatics: 0, animalHandling: 0, athletics: 0, history: 0, insight: 0, intimidation: 0, perception: 0, survival: 0 }) }), 
                skillCount: 2,
                spellcastingAbility: 'Intelligence for the effective use of items, scrolls, and equipment.', 
                classActions: [new ObjectId('663755d85297ed4f922e3a57')] }),

            CharacterClass.create({ 
                name: 'Monk', 
                description: 'Channel your cosmic enlightenment by deftly dodging and efficiently disassembling your foes through stunning strikes and a whirlwind of martial art attacks.', 
                hp: 8, 
                hpPerLevel: 5, 
                keyAbilities: ['Wisdom for improved Ki DC and Armour Class.', 'Constitution for more Hit Points.', 'Dexterity for attack rolls and damage rolls of unarmed strikes and monk weapons, higher Initiative and Armour Class.'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ strength: 1, dexterity: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, shortSwords: 1 }), 
                    
                    skills: new Skills({ history: 0, insight: 0, religion: 0, acrobatics: 0, stealth: 0, athletics: 0 }) }),
                skillCount: 2,
                spellcastingAbility: 'Wisdom', 
                classActions: [new ObjectId('663755d85297ed4f922e3a58'), new ObjectId('663755d85297ed4f922e3a59'), new ObjectId('663755d85297ed4f922e3a5a'), new ObjectId('663755d85297ed4f922e3a5b'), new ObjectId('663755d85297ed4f922e3a5c'), new ObjectId('663755d85297ed4f922e3a5d')] }),

            CharacterClass.create({ 
                name: 'Paladin', 
                description: 'Fuelled by the Oath you swore to uphold justice and righteousness, you are a beacon of hope in dark times.', 
                hp: 10, 
                hpPerLevel: 6, 
                keyAbilities: ['Strength or Dexterity for physical attacks.', 'Charisma for Spells, Aura and Channel Oath Abilities.', 'Constitution for Hit Points and Concentration Checks.'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ wisdom: 1, charisma: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, flails: 1, morningstars: 1, rapiers: 1, scimitars: 1, shortSwords: 1, warPicks: 1, battleAxes: 1, longSwords: 1, tridents: 1, warHammers: 1, glaives: 1, greatAxes: 1, halberds: 1, greatSwords: 1, mauls: 1, pikes: 1, handCrossbows: 1, heavyCrossbows: 1, longbows: 1 }), 
                    
                    armour: new Armour({ lightArmour: 1, mediumArmour: 1, heavyArmour: 1, shields: 1 }), 
                    
                    skills: new Skills({ athletics: 0, insight: 0, intimidation: 0, medicine: 0, persuasion: 0, religion: 0 }) }),
                skillCount: 2,
                spellcastingAbility: 'Charisma', 
                classActions: [new ObjectId('663755d85297ed4f922e3a5e'), new ObjectId('663755d85297ed4f922e3a5f')] }),

            CharacterClass.create({ 
                name: 'Ranger', 
                description: 'Rangers are unrivalled scouts and trackers, honing a deep connection with nature in order to hunt their favoured prey.', 
                hp: 10, 
                hpPerLevel: 6, 
                keyAbilities: ['Dexterity (or Strength) for physical attacks', 'Constitution for Hit Points and Concentration Checks'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ strength: 1, dexterity: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, flails: 1, morningstars: 1, rapiers: 1, scimitars: 1, shortSwords: 1, warPicks: 1, battleAxes: 1, longSwords: 1, tridents: 1, warHammers: 1, glaives: 1, greatAxes: 1, halberds: 1, greatSwords: 1, mauls: 1, pikes: 1, handCrossbows: 1, heavyCrossbows: 1, longbows: 1 }), 
                    
                    armour: new Armour({ lightArmour: 1, mediumArmour: 1, heavyArmour: 1, shields: 1 }), 
                    
                    skills: new Skills({ animalHandling: 0, athletics: 0, insight: 0, nature: 0, perception: 0, stealth: 0, survival: 0 }) }),
                skillCount: 3,
                spellcastingAbility: 'Wisdom' }),

            CharacterClass.create({ 
                name: 'Rogue', 
                description: "With stealth, skill, and uncanny reflexes, a rogue's versatility lets them get the upper hand in almost any situation.", 
                hp: 8, 
                hpPerLevel: 5, 
                keyAbilities: ['Dexterity for physical attacks and Armour Class.', 'Constitution for Hit Points.', 'Intelligence for Spells (Arcane Trickster only)'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ dexterity: 1, intelligence: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1, shortBows: 1, handCrossbows: 1, rapiers: 1, longSwords: 1, shortSwords: 1 }), 
                    
                    armour: new Armour({ lightArmour: 1 }), 
                    
                    skills: new Skills({ acrobatics: 0, athletics: 0, deception: 0, insight: 0, intimidation: 0, investigation: 0, perception: 0, performance: 0, persuasion: 0, sleightOfHand: 0, stealth: 0 }) }),
                skillCount: 4,
                spellcastingAbility: ' Intelligence for the effective use of items, scrolls, and equipment.', 
                classActions: [new ObjectId('663755d85297ed4f922e3a60'), new ObjectId('663755d85297ed4f922e3a61'), new ObjectId('663755d85297ed4f922e3a62')] }),

            CharacterClass.create({ 
                name: 'Sorcerer', 
                description: 'Sorcerers are natural spellcasters, drawing on inherent magic from a gift or bloodline.', 
                hp: 6, 
                hpPerLevel: 4, 
                keyAbilities: ['Charisma for Spells', 'Constitution for Hit Points and Concentration Checks.', 'Dexterity for Armour Class'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ charisma: 1, constitution: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ daggers: 1, quarterstaves: 1, lightCrossbows: 1 }), 
                    skills: new Skills({ arcana: 0, deception: 0, insight: 0, intimidation: 0, persuasion: 0, religion: 0 }) }),
                skillCount: 2,
                spellcastingAbility: 'Charisma', 
                spellcasting: new Spellcasting({ 
                    cantripCount: 4, 
                    availableCantrips: [new ObjectId('66354088b3c877f62144ffff'), new ObjectId('66354088b3c877f621450000'),new ObjectId('66354088b3c877f621450001'), new ObjectId('66354088b3c877f621450002'), new ObjectId('66354088b3c877f621450004'), new ObjectId('66354088b3c877f621450005'), new ObjectId('66354088b3c877f621450008'), new ObjectId('66354088b3c877f621450006'), new ObjectId('66354088b3c877f621450009'), new ObjectId('66354088b3c877f62145000a'),new ObjectId('66354088b3c877f62145000c'), new ObjectId('66354088b3c877f621450012'), new ObjectId('66354088b3c877f621450015')], 
                    
                    spellCount: 2, 
                    availableSpells: [new ObjectId('66335a87863710c59eae0f40'), new ObjectId('66335a87863710c59eae0f41'),new ObjectId('66335a87863710c59eae0f42'), new ObjectId('66335a87863710c59eae0f49'), new ObjectId('66335a87863710c59eae0f4e'), new ObjectId('66335a87863710c59eae0f64'), new ObjectId('66335a87863710c59eae0f53'), new ObjectId('66335a87863710c59eae0f55'), new ObjectId('66335a87863710c59eae0f56'), new ObjectId('66335a87863710c59eae0f58'),new ObjectId('66335a87863710c59eae0f62'), new ObjectId('66335a87863710c59eae0f67'), new ObjectId('66335a87863710c59eae0f68'), new ObjectId('66335a87863710c59eae0f6a'), new ObjectId('66335a87863710c59eae0f6d'), new ObjectId('66335a87863710c59eae0f6f'), new ObjectId('66335a87863710c59eae0f73'), new ObjectId('66335a87863710c59eae0f75')] }) }),

            CharacterClass.create({ 
                name: 'Warlock', 
                description: 'Bound by a pact to an all-powerful patron, Warlocks trade their loyalty for supernatural abilities and unique magic.', 
                hp: 8, 
                hpPerLevel: 5, 
                keyAbilities: ['Charisma for Spells', 'Constitution for Hit Points and Concentration Checks.', 'Dexterity for Armour Class'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ charisma: 1, wisdom: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ clubs: 1, daggers: 1, handAxes: 1, javelins: 1, lightHammers: 1, maces: 1, sickles: 1, quarterstaves: 1, spears: 1, greatClubs: 1, lightCrossbows: 1 }), 
                    
                    armour: new Armour({ lightArmour: 1 }), 
                    
                    skills: new Skills({ arcana: 0, deception: 0, history: 0, intimidation: 0, investigation: 0, nature: 0, religion: 0 }) }),
                skillCount: 2,
                spellcastingAbility: 'Charisma', 
                spellcasting: new Spellcasting({ 
                    cantripCount: 2, 
                    availableCantrips: [new ObjectId('66354088b3c877f621450000'), new ObjectId('66354088b3c877f621450001'),new ObjectId('66354088b3c877f621450003'), new ObjectId('66354088b3c877f621450005'), new ObjectId('66354088b3c877f621450006'), new ObjectId('66354088b3c877f621450009'), new ObjectId('66354088b3c877f62145000a'), new ObjectId('66354088b3c877f621450015')], 
                    
                    spellCount: 2, 
                    availableSpells: [new ObjectId('66335a87863710c59eae0f3c'), new ObjectId('66335a87863710c59eae0f3d'),new ObjectId('66335a87863710c59eae0f41'), new ObjectId('66335a87863710c59eae0f53'), new ObjectId('66335a87863710c59eae0f5e'), new ObjectId('66335a87863710c59eae0f60'), new ObjectId('66335a87863710c59eae0f69'), new ObjectId('66335a87863710c59eae0f75')] }), 
                classActions: [new ObjectId('663755d85297ed4f922e3a63')] }),

            CharacterClass.create({ 
                name: 'Wizard', 
                description: 'Wizards master the arcane by specialising in individual schools of magic, combining ancient spells with modern research.', 
                hp: 6, 
                hpPerLevel: 4, 
                keyAbilities: ['Intelligence for Spells', 'Constitution for Hit Points and Concentration checks.', 'Dexterity for Armour Class'], 
                savingThrowProficiencies: new SavingThrowProficiencies({ intelligence: 1, wisdom: 1 }), 
                proficiencies: new Proficiencies({ 
                    weapons: new Weapons({ daggers: 1, quarterstaves: 1, lightCrossbows: 1 }), 
                    skills: new Skills({ arcana: 0, history: 0, investigation: 0, insight: 0, medicine: 0, religion: 0 }) }), 
                skillCount: 2,
                spellcastingAbility: 'Intelligence', 
                spellcasting: new Spellcasting({ 
                    cantripCount: 3, 
                    availableCantrips: [new ObjectId('66354088b3c877f62144ffff'), new ObjectId('66354088b3c877f621450000'),new ObjectId('66354088b3c877f621450001'), new ObjectId('66354088b3c877f621450002'), new ObjectId('66354088b3c877f621450004'), new ObjectId('66354088b3c877f621450005'), new ObjectId('66354088b3c877f621450008'), new ObjectId('66354088b3c877f621450006'), new ObjectId('66354088b3c877f621450009'), new ObjectId('66354088b3c877f62145000a'),new ObjectId('66354088b3c877f62145000c'), new ObjectId('66354088b3c877f621450012'), new ObjectId('66354088b3c877f621450015')], 
                    
                    spellCount: 2, 
                    availableSpells: [new ObjectId('66335a87863710c59eae0f40'), new ObjectId('66335a87863710c59eae0f41'),new ObjectId('66335a87863710c59eae0f42'), new ObjectId('66335a87863710c59eae0f49'), new ObjectId('66335a87863710c59eae0f4e'), new ObjectId('66335a87863710c59eae0f64'), new ObjectId('66335a87863710c59eae0f53'), new ObjectId('66335a87863710c59eae0f55'), new ObjectId('66335a87863710c59eae0f56'), new ObjectId('66335a87863710c59eae0f57'),new ObjectId('66335a87863710c59eae0f58'), new ObjectId('66335a87863710c59eae0f5a'), new ObjectId('66335a87863710c59eae0f62'), new ObjectId('66335a87863710c59eae0f65'), new ObjectId('66335a87863710c59eae0f67'), new ObjectId('66335a87863710c59eae0f68'), new ObjectId('66335a87863710c59eae0f69'), new ObjectId('66335a87863710c59eae0f6a'), new ObjectId('66335a87863710c59eae0f6d'), new ObjectId('66335a87863710c59eae0f6f'), new ObjectId('66335a87863710c59eae0f71'), new ObjectId('66335a87863710c59eae0f73'), new ObjectId('66335a87863710c59eae0f75')] }), 
                classActions: [new ObjectId('663755d85297ed4f922e3a64'), new ObjectId('663755d85297ed4f922e3a65')] })
        ])
            .then((characterClasses) => {
                const clericClass = characterClasses.find(characterClass => characterClass.name === 'Cleric')
                const paladinClass = characterClasses.find(characterClass => characterClass.name === 'Paladin')
                const sorcererClass = characterClasses.find(characterClass => characterClass.name === 'Sorcerer')
                const warlockClass = characterClasses.find(characterClass => characterClass.name === 'Warlock')

                return Promise.all([
                    CharacterClass.create({ 
                        name: 'Life Domain', 
                        description: 'The Life domain is an aspect of many good deities, offering spells that protect and restore the mind, body, and soul.', 
                        proficiencies: new Proficiencies({ 
                            armour: new Armour({ heavyArmour: 1 }) }), 
                        knownSpells: [new ObjectId('66335a87863710c59eae0f4d'), new ObjectId('66335a87863710c59eae0f3f')],
                        classActions: [new ObjectId('663755d85297ed4f922e3a66')], 
                        parent: clericClass._id }),

                    CharacterClass.create({ 
                        name: 'Light Domain', 
                        description: 'The Light domain is offered by deities of justice, majesty, and primordial flame, providing spells that dispel darkness and harm the undead.', 
                        knownSpells: [new ObjectId('66335a87863710c59eae0f40'), new ObjectId('66335a87863710c59eae0f54')], 
                        knownCantrips: [new ObjectId('66354088b3c877f621450008')], 
                        classActions: [new ObjectId('663755d85297ed4f922e3a67')], 
                        parent: clericClass._id }),

                    CharacterClass.create({ 
                        name: 'Trickery Domain', 
                        description: 'A domain shared by wicked, chaotic, and mischievous deities alike, those who channel Trickery specialise in deception and illusion magic', 
                        knownSpells: [new ObjectId('66335a87863710c59eae0f41'), new ObjectId('66335a87863710c59eae0f4e')], 
                        classActions: [new ObjectId('663755d85297ed4f922e3a68')], 
                        parent: clericClass._id }),

                    CharacterClass.create({ 
                        name: 'Knowledge Domain', 
                        description: 'Adaptable and adroit in all manner of languages and skills, your mind is an intellectual cup brimming with exquisite knowing.', 
                        expertises: new Skills({ arcana: 0, history: 0, nature: 0, religion: 0 }), 
                        knownSpells: [new ObjectId('66335a87863710c59eae0f4a'), new ObjectId('66335a87863710c59eae0f6f')], 
                        classActions: [new ObjectId('663755d85297ed4f922e3a69')], 
                        parent: clericClass._id }),

                    CharacterClass.create({ 
                        name: 'Nature Domain', 
                        description: "You embody the vast viridian power of the natural world, an avatar of the subtle divinity of fruitfall, avian migration, woodland silence, and the landslide's roaring fury.", 
                        proficiencies: new Proficiencies({ 
                            armour: new Armour({ heavyArmour: 1 }),
                            skills: new Skills({ animalHandling: 0, nature: 0, survival: 0 })
                        }),
                        skillCount: 1,
                        spellcasting: new Spellcasting({ 
                            cantripCount: 1, 
                            availableCantrips: [new ObjectId('66354088b3c877f62145000a'), new ObjectId('66354088b3c877f62145000b'), new ObjectId('66354088b3c877f621450011'), new ObjectId('66354088b3c877f621450014'),] }), 
                            
                        knownSpells: [new ObjectId('66335a87863710c59eae0f70'), new ObjectId('66335a87863710c59eae0f3b')], 
                        classActions: [new ObjectId('663755d85297ed4f922e3a6a')], 
                        parent: clericClass._id }),

                    CharacterClass.create({ 
                        name: 'Tempest Domain', 
                        description: 'Your faith has made you the very thunder that quakes the black firmament, the lightning coursing through the veins of a terrible storm.', 
                        proficiencies: new Proficiencies({ 
                            weapons: new Weapons({ flails: 1, morningstars: 1, rapiers: 1, scimitars: 1, shortSwords: 1, warPicks: 1, battleAxes: 1, longSwords: 1, tridents: 1, warHammers: 1, glaives: 1, greatAxes: 1, halberds: 1, greatSwords: 1, mauls: 1, pikes: 1, handCrossbows: 1, heavyCrossbows: 1, longbows: 1 }), 
                            
                            armour: new Armour({ heavyArmour: 1 }) }), 
                        knownSpells: [new ObjectId('66335a87863710c59eae0f73'), new ObjectId('66335a87863710c59eae0f58')], 
                        classActions: [new ObjectId('663755d85297ed4f922e3a6b')], 
                        parent: clericClass._id }),

                    CharacterClass.create({ 
                        name: 'War Domain', 
                        description: 'Fortified by holy zeal, you brandish an arsenal of sacramental savagery to use against those you deem unrighteous.', 
                        proficiencies: new Proficiencies({ 
                            weapons: new Weapons({ flails: 1, morningstars: 1, rapiers: 1, scimitars: 1, shortSwords: 1, warPicks: 1, battleAxes: 1, longSwords: 1, tridents: 1, warHammers: 1, glaives: 1, greatAxes: 1, halberds: 1, greatSwords: 1, mauls: 1, pikes: 1, handCrossbows: 1, heavyCrossbows: 1, longbows: 1 }), 
                            
                            armour: new Armour({ heavyArmour: 1 }) }), 
                        knownSpells: [new ObjectId('66335a87863710c59eae0f50'), new ObjectId('66335a87863710c59eae0f6e')], 
                        classActions: [new ObjectId('663755d85297ed4f922e3a6c')], 
                        parent: clericClass._id }),

                    CharacterClass.create({ 
                        name: 'Oath of the Ancients', 
                        description: 'You fight on the side of light in the cosmic struggle against darkness to preserve the sanctity of life and the beauty of nature.', 
                        classActions: [new ObjectId('663755d85297ed4f922e3a6d')], 
                        parent: paladinClass._id }),

                    CharacterClass.create({ 
                        name: 'Oath of Devotion', 
                        description: 'Following the ideal of the knight in shining armour, you act with honour and virtue to protect the weak and pursue the greater good.', 
                        classActions: [new ObjectId('663755d85297ed4f922e3a6e')], 
                        parent: paladinClass._id }),

                    CharacterClass.create({ 
                        name: 'Oath of Vengeance', 
                        description: 'You have set aside even your own purity to right wrongs and deliver justice to those who have committed the most grievous sins.', 
                        classActions: [new ObjectId('663755d85297ed4f922e3a6f')], 
                        parent: paladinClass._id }),

                    CharacterClass.create({ 
                        name: 'Wild Magic', 
                        description: 'Your powers come from ancient forces of chaos. They churn within you -- waiting to burst free at any time.', 
                        classActions: [new ObjectId('663755d85297ed4f922e3a70'), new ObjectId('663755d85297ed4f922e3a71')], 
                        parent: sorcererClass._id }),

                    CharacterClass.create({ 
                        name: 'Draconic Bloodline', 
                        description: 'Your veins carry draconic magic, the result of a powerful dragon ancestor.', 
                        classActions: [new ObjectId('663755d85297ed4f922e3a72'), new ObjectId('663755d85297ed4f922e3a73'), new ObjectId('663755d85297ed4f922e3a74')], 
                        parent: sorcererClass._id }),

                    CharacterClass.create({ 
                        name: 'Storm Sorcery', 
                        description: 'Whether crackling with the energy of ancient deluges or pierced by gales and hurricanes, your lineage is a strange tapestry scrawled by a tempest.', 
                        classActions: [new ObjectId('663755d85297ed4f922e3a75')], 
                        parent: sorcererClass._id }),

                    CharacterClass.create({ 
                        name: 'The Archfey', 
                        description: "Graced by a lady or lord of the fey, you are imbued with all the sumptuous and scary qualities of your patron's extraordinary realm.", 
                        spellcasting: new Spellcasting({ 
                            availableSpells: [new ObjectId('66335a87863710c59eae0f54'), new ObjectId('66335a87863710c59eae0f6f')] }),
                        classActions: [new ObjectId('663755d85297ed4f922e3a78')], 
                        parent: warlockClass._id }),

                    CharacterClass.create({ 
                        name: 'The Fiend', 
                        description: 'You have pledged your soul to the Hells or Abyss in return for a deadly arsenal of fiendish arcana.', 
                        spellcasting: new Spellcasting({ 
                            availableSpells: [new ObjectId('66335a87863710c59eae0f40'), new ObjectId('66335a87863710c59eae0f4a')] }), 
                        classActions: [new ObjectId('663755d85297ed4f922e3a76')], 
                        parent: warlockClass._id }),

                    CharacterClass.create({ 
                        name: 'The Great Old One', 
                        description: 'You pledged something unthinkable to an unspeakably ancient entity - which in return furnished you with powers of cerebral entropy and control.', 
                        spellcasting: new Spellcasting({ 
                            availableSpells: [new ObjectId('66335a87863710c59eae0f4f'), new ObjectId('66335a87863710c59eae0f71')] }), 
                        classActions: [new ObjectId('663755d85297ed4f922e3a77')], parent: warlockClass._id })
                ])
            })
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)