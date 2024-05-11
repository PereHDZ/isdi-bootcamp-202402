import mongoose, { ObjectId } from 'mongoose'

import { Features, Proficiencies, Race, Weapons, Armour, Skills } from '../models'
import { DraconicAncestry, FeyAncestry, SuperiorDarkvision, HumanVersatility, Darkvision, SavageAttacks, RelentlessEndurance, HalflingLuck, Brave, DwarvenResilience, GnomeCunning, HellishResistance, AstralKnowledge, GithyankiPsionics, DrowMagic, HighElfCantrip, FleetOfFoot, NaturallyStealthy, StrongheartResilience, DwarvenToughness, DuergarResilience, DuergarMagic, AdditionalSpell, StoneCamuflage, TieflingMagic, AcidBreath, LightningBreath, FireBreath, PoisonBreath, FrostBreath } from '../features/models'

const { Types: { ObjectId } } = mongoose

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => Race.deleteMany())
        .then(() => 
            Promise.all([
                Race.create({ 
                    name: 'Dragonborn', 
                    description: 'A proud race that values clan and skills above all else. Once enslaved by dragons, they strive to be self-sufficient, not wanting to be beholden to anyone, not even the gods.', 
                    speed: 9, 
                    features: new Features({ 
                        draconicAncestry: new DraconicAncestry({ 
                            name: 'Draconic Ancestry', 
                            bonusesDescription: 'You are distantly related to a particular kind of dragon. This determines the damage and area of your breath weapon, and the type of resistance you gain.' }) }) }),

                Race.create({ 
                    name: 'Elf', 
                    description: "With an ethereal countenance and long lifespans, elves are at home with nature's power, flourishing in light and dark alike.", 
                    proficiencies: new Proficiencies({ 
                        weapons: new Weapons({ spears: 1, pikes: 1, halberds: 1, glaives: 1 }), 
                        armour: new Armour({ lightArmour: 1, shields: 1 }) }), 
                    features: new Features({ 
                        feyAncestry: new FeyAncestry({ 
                            name: 'Fey Ancestry', 
                            bonusesDescription: "The Feywild casts a veil over your mind. You have Advantage on Saving throws against being Charmed, and magic can't put you to Sleep." }), 
                        darkvision: new Darkvision({ 
                            name: 'Darkvision', 
                            bonusesDescription: 'Can see in the dark up to 12 m / 40 ft.', 
                            darkVisionRange: 12 }) }) }),

                Race.create({ 
                    name: 'Drow', 
                    description: "Driven to the Underdark, most drow have adopted a ruthless pragmatism. While the Lolth-sworn delight in the goddess' evil tenets, the Seldarine reject Her attempt to overthrow the leader of the elven pantheon.", 
                    speed: 9, 
                    proficiencies: new Proficiencies({ 
                        weapons: new Weapons({ rapiers: 1, shortSwords: 1, handCrossbows: 1 }), 
                        skills: new Skills({ perception: 1 }) }), 
                    features: new Features({ 
                        feyAncestry: new FeyAncestry({ 
                            name: 'Fey Ancestry', 
                            bonusesDescription: "The Feywild casts a veil over your mind. You have Advantage on Saving throws against being Charmed, and magic can't put you to Sleep." }), 
                        superiorDarkvision: new SuperiorDarkvision({ 
                            name: 'Superior Darkvision', 
                            bonusesDescription: 'Can see in the dark up to 24m.', 
                            darkVisionRange: 12 }), 
                        drowMagic: new DrowMagic({
                            name: 'Drow Magic', 
                            bonusesDescription: 'Drow Magic grants Drow access to the following Spells, which can be cast once each per Long Rest:\nCantrip: Dancing Lights (at character level 1)\n1st Level Spell: Faerie Fire (at character level 3)\n2nd Level Spell: Darkness (at character level 5)', 
                            cantrip: new ObjectId('66354088b3c877f621450002') }) }) }),

                Race.create({ 
                    name: 'Human', 
                    description: 'The most common face to see in Faerûn, humans are known for their tenacity, creativity, and endless capacity for growth.', 
                    speed: 9, 
                    proficiencies: new Proficiencies({ 
                        weapons: new Weapons({ spears: 1, pikes: 1, halberds: 1, glaives: 1 }), 
                        armour: new Armour({ lightArmour: 1, shields: 1 })}), 
                    features: new Features({ 
                        humanVersatility: new HumanVersatility({ 
                            name: 'Human Versatility', 
                            bonusesDescription: 'Select an additional Skill to be Proficient in. Your carrying capacity is increased by a quarter.', 
                            carryingCapacityBonus: 0.25, 
                            skillCount: 1 }) }) }),
                            
                Race.create({ 
                    name: 'Half-Elf', 
                    description: 'Half-Elves inherit blessings from both their parents, but at the price of never quite fitting in. Curious, ambitious, and versatile, half-elves are welcome everywhere, but struggle without a community to call their own.', 
                    proficiencies: new Proficiencies({ 
                        weapons: new Weapons({ spears: 1, pikes: 1, halberds: 1, glaives: 1 }), 
                        armour: new Armour({ lightArmour: 1, shields: 1 }) }), 
                    features: new Features({ 
                        feyAncestry: new FeyAncestry({ 
                            name: 'Fey Ancestry', 
                            bonusesDescription: "The Feywild casts a veil over your mind. You have Advantage on Saving throws against being Charmed, and magic can't put you to Sleep." }) }), 
                        darkvision: new Darkvision({ 
                            name: 'Darkvision', 
                            bonusesDescription: 'Can see in the dark up to 12 m / 40 ft.', 
                            darkVisionRange: 12 }) }),

                Race.create({ 
                    name: 'Half-Orc', 
                    description: 'Creatures of intense emotion, Half-Orcs are more inclined to act than contemplate - whether the rage burning their bodies compels them to fight, or the love filling their hearts inspires acts of incredible kindness.', 
                    speed: 9, 
                    proficiencies: new Proficiencies({ skills: new Skills({ intimidation: 1 }) }), 
                    features: new Features({ 
                        darkvision: new Darkvision({ 
                            name: 'Darkvision', 
                            bonusesDescription: 'Can see in the dark up to 12 m / 40 ft.', 
                            darkVisionRange: 12 }), 
                        savageAttacks: new SavageAttacks({ 
                            name: 'Savage Attacks', 
                            bonusesDescription: 'When you land a Critical Hit with a melee weapon attack, you deal an extra dice of weapon damage.', 
                            criticalHitDice: 1 }), 
                        relentlessEndurance: new RelentlessEndurance({ 
                            name: 'Relentless Endurance', 
                            bonusesDescription: 'If you reach 0 hit points, you regain 1hit points instead of becoming Downed.'}) }) }),

                Race.create({ 
                    name: 'Halfling', 
                    description: 'Small yet capable, halflings prefer the comforts of home and hearth - but their natural luck and dexterity makes them fine adventurers.', 
                    speed: 7.5, 
                    features: new Features({ 
                        halflingLuck: new HalflingLuck({ 
                            name: 'Halfling Luck', 
                            bonusesDescription: 'When you roll a 1 for an Attack roll, Ability check, or Saving throw, you can reroll the dice and must use the new roll.' }), 
                        brave: new Brave({ 
                            name: 'Brave', 
                            bonusesDescription:'You have Advantage on Saving Throws against Frightened.' }) }) }),

                Race.create({ 
                    name: 'Dwarf', 
                    description: 'As durable and unyielding as their homes of stone, dwarves are some of the finest warriors, miners, and smiths of Faerûn.', 
                    speed: 7.5, 
                    proficiencies: new Proficiencies({ 
                        weapons: new Weapons({ battleAxes: 1, handAxes: 1, lightHammers: 1, warHammers: 1 }) }), 
                    features: new Features({ 
                        dwarvenResilience: new DwarvenResilience({ 
                            name: 'Dwarven Resilience', 
                            bonusesDescription: 'You have Advantage on  Saving throws against being Poisoned and you have Resistance against Poison damage.' }), 
                        darkvision: new Darkvision({ 
                            name: 'Darkvision', 
                            bonusesDescription: 'Can see in the dark up to 12 m / 40 ft.', 
                            darkVisionRange: 12 }) }) }),

                Race.create({ 
                    name: 'Gnome', 
                    description: "Small, clever, and energetic, gnomes use their long lives to explore Faerûn's brightest corners and darkest depths.", 
                    speed: 7.5, 
                    features: new Features({ 
                        gnomeCunning: new GnomeCunning({ 
                            name: 'Gnome Cunning', 
                            bonusesDescription: 'You have Advantage on Intelligence, Wisdom, and Charisma Saving Throws.' }), 
                        darkvision: new Darkvision({ 
                            name: 'Darkvision', 
                            bonusesDescription: 'Can see in the dark up to 12 m / 40 ft.', 
                            darkVisionRange: 12 }) }) }),

                Race.create({ 
                    name: 'Tiefling', 
                    description: 'Descended from devils of the Nine Hells - by blood or curse - tieflings face constant suspicion in Faerûn. Their arcane abilities make them natural survivors, whether as heroes or villains.', 
                    speed: 9, 
                    features: new Features({ 
                        hellishResistance: new HellishResistance({ 
                            name:'Hellish Resistance', 
                            bonusesDescription: 'Your blood protects you from flame, abyssal or otherwise. Gain Resistance to Fire damage, taking only half damage from it.' }), 
                        darkvision: new Darkvision({ 
                            name: 'Darkvision', 
                            bonusesDescription: 'Can see in the dark up to 12 m / 40 ft.', 
                            darkVisionRange: 12 }) }) }),

                Race.create({ 
                    name: 'Githyanki', 
                    description: 'With a ruthlessness borne from mind flayer enslavement, githyanki ride the Astral Sea atop red dragons, bringing their silver swords and psionic might to bear against any trace of the illithid menace.',
                    speed: 9, 
                    proficiencies: new Proficiencies({ 
                        weapons: new Weapons({ shortSwords: 1, longSwords: 1, greatSwords: 1 }), 
                        armour: new Armour({ lightArmour: 1, mediumArmour: 1 }) }), 
                    features: new Features({ 
                        astralKnowledge: new AstralKnowledge({ 
                            name: 'Astral Knowledge', 
                            bonusesDescription: 'Gain Proficiency in all Skills corresponding to a chosen Ability each Long Rest' }), 
                        githyankiPsionics: new GithyankiPsionics({ 
                            name: 'Githyanki Psionics', 
                            bonusesDescription: 'Githyanki Psionics grants Githyanki access to the following Spells, based on character level:\nCantrip: Mage Hand (Character level 1). Your Mage Hand is invisible when cast via Githyanki Psionics.\n1st Level Spell: Enhance Leap (Character level 3).\n2nd Level Spell: Misty Step (Character level 5)   Recharge: Long rest', 
                        cantrip: new ObjectId('66354088b3c877f621450006') }) }) })
            ])
                .then((races) => {
                    const elfRace = races.find(race => race.name === 'Elf')
                    const drowRace = races.find(race => race.name === 'Drow')
                    const halfElfRace = races.find(race => race.name === 'Half-Elf')
                    const halflingRace = races.find(race => race.name === 'Halfling')
                    const dwarfRace = races.find(race => race.name === 'Dwarf')
                    const gnomeRace = races.find(race => race.name === 'Gnome')
                    const tieflingRace = races.find(race => race.name === 'Tiefling')
                    const dragonbornRace = races.find(race => race.name === 'Dragonborn')

                    return Promise.all([
                        Race.create({ 
                            name: 'High Elf', 
                            description: 'Heirs of the mystical Feywild, high elves value magic in all its forms, and even those who do not study spellcraft can manipulate the Weave.', 
                            speed: 9, 
                            features: new Features({ 
                                highElfCantrip: new HighElfCantrip({ 
                                    name: 'High Elf Cantrip', 
                                    bonusesDescription: 'Choose 1 Cantrip from the Wizard spell list. Note that this means these cantrips use Intelligence as a casting stat.', 
                                    cantripCount: 1 }) }), 
                            parent: elfRace._id }),

                        Race.create({ 
                            name: 'Wood Elf', 
                            description: "Wood elves spend their reclusive lives in Faerûn's forests. Decades of training in archery and camouflage are enhanced by an otherworldly swiftness.", 
                            speed: 10.5, 
                            proficiencies: new Proficiencies({ 
                                skills: new Skills({ perception: 1 }) }), 
                            features: new Features({ 
                                fleetOfFoot: new FleetOfFoot({ 
                                    name: 'Fleet of foot', 
                                    bonusesDescription: 'Your Movement Speed is 10.5m / 35ft.' }) }), 
                            parent: elfRace._id }),

                        Race.create({ 
                            name: 'Lolth-Sworn Drow', 
                            description: "Raised by Lolth's cult in the city of Menzoberranzan, these drow extol the virtues of their corrupt and merciless goddess. Lolth marks her followers with bright red eyes so the Underdark will learn to fear Drow on sight.", 
                            parent: drowRace._id }),

                        Race.create({ 
                            name: 'Seldarine Drow', 
                            description: "Drow are the result of an ancient schism between the elven deities Corellon Larethian and Lolth. The latter's treachery drove the drow into the Underdark, where they splintered into warring factions. Seldarine drow can be found seeking allies from all over Faerûn, aiming to settle their conflict with Lolth - and themselves - by any means necessary.", 
                            parent: drowRace._id }),

                        Race.create({ 
                            name: 'High Half-Elf', 
                            description: 'A touch of the Feywild remains in half-elves with this bloodline, and even those untrained in magic possess a hint of wild power.', 
                            speed: 9, 
                            features: new Features({ 
                                highElfCantrip: new HighElfCantrip({ 
                                    name: 'High Elf Cantrip', 
                                    bonusesDescription: 'Choose 1 Cantrip from the Wizard spell list. Note that this means these cantrips use Intelligence as a casting stat.', 
                                    cantripCount: 1 }) }), 
                            parent: halfElfRace._id }),

                        Race.create({ 
                            name: 'Wood Half-Elf', 
                            description: "Like their wood elf parent, these half-elves have a quickened stride and eye for stealth. Yet many break away from isolation in Faerûn's forests to explore the rest of the Realms.", 
                            speed: 10.5, 
                            proficiencies: new Proficiencies({ 
                                skills: new Skills({ stealth: 1 }) }), 
                            features: new Features({ 
                                fleetOfFoot: new FleetOfFoot({ 
                                    name: 'Fleet of foot', 
                                    bonusesDescription: 'Your Movement Speed is 10.5m / 35ft.' }) }), 
                            parent: halfElfRace._id }),

                        Race.create({ 
                            name: 'Drow Half-Elf', 
                            description: "Most Half-Drow result from liaisons between Seldarine Drow and surfacers. While Half-Drow inherit a few magical gifts, they aren't usually raised in the Underdark.", 
                            speed: 9, 
                            features: new Features({ 
                                drowMagic: new DrowMagic({ 
                                    name: 'Drow Magic', 
                                    bonusesDescription: 'Drow Magic grants Drow access to the following Spells, which can be cast once each per Long Rest:\nCantrip: Dancing Lights (at character level 1)\n1st Level Spell: Faerie Fire (at character level 3)\n2nd Level Spell: Darkness (at character level 5)', 
                                    cantrip: new ObjectId('66354088b3c877f621450002') }) }), 
                            parent: halfElfRace._id }),

                        Race.create({ 
                            name: 'Lightfoot Halfling', 
                            description: 'Lightfoot Halflings are stealthy but social, travelling all over Faerûn to make a name for themselves.', 
                            features: new Features({ 
                                naturallyStealthy: new NaturallyStealthy({ 
                                    name: 'Naturally Stealthy', 
                                    bonusesDescription: 'Your nimble nature makes you skilled at concealment. You have Advantage Icon.png Advantage on Stealth Checks.' }) }), 
                            parent: halflingRace._id }),

                        Race.create({ 
                            name: 'Strongheart Halfling', 
                            description: 'Legends say dwarven blood gave stronghearts their hardiness. Resistant to poison and wellsprings of endurance, these halflings easily hold their own.', 
                            features: new Features({ 
                                strongheartResilience: new StrongheartResilience({ 
                                    name: 'Strongheart Resilience', 
                                    bonusesDescription: 'You have Advantage on Saving Throws against being Poisoned and Resistance to TypesPoison damage.' }) }), 
                            parent: halflingRace._id }),

                        Race.create({ 
                            name: 'Gold Dwarf', 
                            description: 'Gold Dwarves are known for their confidence and keen intuition. The culture of their Deep Kingdom values family, ritual, and fine craftsmanship.', 
                            features: new Features({ 
                                dwarvenToughness: new DwarvenToughness({ 
                                    name: 'Dwarven Toughness', 
                                    bonusesDescription: 'You have 1 extra maximum Hit Point per level.', 
                                    hitPointCount: 1 }) }), 
                            parent: dwarfRace._id }),

                        Race.create({ 
                            name: 'Shield Dwarf', 
                            description: 'Shield Dwarves survived a long fall from grace, surrendering many of their ancient kingdoms in wars with Goblins and Orcs. These losses have lead to a cynical mindset, yet Shield Dwarves will endure anything to restore their ancestral homelands.', 
                            proficiencies: new Proficiencies({ 
                                armour: new Armour({ lightArmour: 1, mediumArmour: 1 }) }), 
                            parent: dwarfRace._id }),

                        Race.create({ 
                            name: 'Duergar', 
                            description: 'Once enslaved by the eldritch Mind Flayers, Duergar adapted to freedom with harsh practicality. Their cold demeanours and gift of stealth are well-known through the Underdark.', 
                            features: new Features({ 
                                duergarResilience: new DuergarResilience({ 
                                    name: 'Duergar Resilience', 
                                    bonusesDescription: 'You have Advantage on Saving throws against illusions and against being Charmed or Paralysed.'}), 
                                superiorDarkvision: new SuperiorDarkvision({ 
                                    name: 'Superior Darkvision', 
                                    bonusesDescription: 'Can see in the dark up to 24m.', 
                                    darkVisionRange: 12 }), 
                                duergarMagic: new DuergarMagic({ 
                                    name: 'Duergar Magic', 
                                    bonusesDescription: 'Enlarge and Invisibility Spells at levels 3 and 5'}) }), 
                            parent: dwarfRace._id }),

                        Race.create({ 
                            name: 'Forest Gnome', 
                            description: 'Even smaller than their cousins and twice as reclusive, Forest Gnomes are rare sight in Faerûn. They master magic and craftmanship in their distant, idyllic groves.', 
                            features: new Features({ 
                                additionalSpell: new AdditionalSpell({ 
                                    name: 'Additional Spell', 
                                    bonusesDescription: 'Gets the Spell Speak with Animals by default', 
                                    spell: new ObjectId('66335a87863710c59eae0f70') }) }), 
                            parent: gnomeRace._id }),

                        Race.create({ 
                            name: 'Deep Gnome', 
                            description: 'More guarded than their surface cousins, Deep Gnomes survive in the Underdark with darkvision and skillful stealth.', 
                            features: new Features({ 
                                superiorDarkvision:  new SuperiorDarkvision({ 
                                    name: 'Superior Darkvision', 
                                    bonusesDescription: 'Can see in the dark up to 24m.', 
                                    darkVisionRange: 12 }), 
                                stoneCamuflage: new StoneCamuflage({ 
                                    name: 'Stone Camuflage', 
                                    bonusesDescription: 'You have Advantage on Stealth checks.'}) }), 
                            parent: gnomeRace._id }),

                        Race.create({ 
                            name: 'Rock Gnome', 
                            description: "The most commonly seen gnome on Faerûn's surface, Rock Gnomes are named as such for their hardiness and affinity to metal.", 
                            proficiencies: new Proficiencies({ 
                                skills: new Skills({ history: 2 }) }), 
                            parent: gnomeRace._id }),

                        Race.create({ 
                            name: 'Asmodeus Tiefling', 
                            description: "Bound to Nessus, the deepest layer of the Hells, these Tieflings inherit the ability to wield fire and darkness from the archdevil Asmodeus' infernal bloodline.", 
                            features: new Features({ 
                                tieflingMagic: new TieflingMagic({ 
                                    name: 'Tiefling Magic', 
                                    bonusesDescription: 'Produce Flame, Hellish Rebuke, and Darkness Spells at levels 1, 3, and 5', 
                                    cantrip: new ObjectId('66354088b3c877f62145000b') }) }), 
                            parent: tieflingRace._id }),

                        Race.create({ 
                            name: 'Mephistopheles Tiefling', 
                            description: 'Descended from the archdevil Mephistopheles, these Tieflings are gifted with a particular affinity for arcane magic.', 
                            features: new Features({ 
                                tieflingMagic: new TieflingMagic({ 
                                    name: 'Tiefling Magic', 
                                    bonusesDescription: 'Mage Hand, Burning Hands and Flame Blade Spells at levels 1, 3, and 5', 
                                    cantrip: new ObjectId('66354088b3c877f621450006') }) }), 
                            parent: tieflingRace._id }),
                        Race.create({ 
                            name: 'Zariel Tiefling', 
                            description: "Tieflings from Zariel's bloodlines are empowered with martial strength, and can channel searing flame to punish their enemies", 
                            features: new Features({ 
                                tieflingMagic: new TieflingMagic({ 
                                    name: 'Tiefling Magic', 
                                    bonusesDescription: 'Thaumaturgy, Searing Smite and Branding Smite Spells at levels 1, 3, and 5', 
                                    cantrip: new ObjectId('66354088b3c877f621450013') }) }), 
                                parent: tieflingRace._id }),

                        Race.create({ 
                            name: 'Black Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the charcoal colouration and fizzling, acid breath of black dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Acid damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abee') }), 
                                acidBreath: new AcidBreath({ 
                                    name: 'Acid Breath', 
                                    bonusesDescription: 'Access to the Race Action Acid Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'Blue Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the deep sapphire scales and charged, crackling breath of blue dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Lightning damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abef') }), 
                                lightningBreath: new LightningBreath({ 
                                    name: 'Lightning Breath', 
                                    bonusesDescription: 'Access to the Race Action Lightning Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'Brass Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the burnished ochre hue and flickering, fiery breath of brass dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Fire damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abf0') }), 
                                fireBreath: new FireBreath({ 
                                    name: 'Fire Breath', 
                                    bonusesDescription: 'Access to the Race Action Fire Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'Bronze Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the shining sepia scales and sparkling breath of bronze dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Lightning damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abef') }), 
                                lightningBreath: new LightningBreath({ 
                                    name: 'Lightning Breath', 
                                    bonusesDescription: 'Access to the Race Action Lightning Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'Copper Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the pink-gold colouration and corrosive breath of copper dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Acid damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abee') }), 
                                acidBreath: new AcidBreath({ 
                                    name: 'Acid Breath', 
                                    bonusesDescription: 'Access to the Race Action Acid Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'Gold Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the resplendent shine and roiling, blazing breath of gold dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Fire damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abf0') }), 
                                fireBreath: new FireBreath({ 
                                    name: 'Fire Breath', 
                                    bonusesDescription: 'Access to the Race Action Fire Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'Green Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the brilliant emerald aspect and stinking, putrid breath of green dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Poison damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abf1') }), 
                                poisonBreath: new PoisonBreath({ 
                                    name: 'Poison Breath', 
                                    bonusesDescription: 'Access to the Race Action Poison Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ name: 
                            'Red Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the bright scarlet likeness and roiling, burning breath of red dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Fire damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abf0') }), 
                                fireBreath: new FireBreath({ 
                                    name: 'Fire Breath', 
                                    bonusesDescription: 'Access to the Race Action Fire Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'Silver Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the glinting shine and scorching cold breath of silver dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Ice damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abf2') }), 
                                frostBreath: new FrostBreath({ 
                                    name: 'Frost Breath', 
                                    bonusesDescription: 'Access to the Race Action Frost Breath' }) }), 
                            parent: dragonbornRace._id }),

                        Race.create({ 
                            name: 'White Dragonborn', 
                            description: 'Despite no ancestral links to the mighty creatures, these dragonborn share the snowy aspect and frosty breath of white dragons.', 
                            features: new Features({ 
                                draconicAncestry: new DraconicAncestry({ 
                                    name: 'Draconic Ancestry', 
                                    bonusesDescription: 'Resistance to Ice damage', 
                                    raceAction: new ObjectId('6633655110163f6de2d4abf2') }), 
                                frostBreath: new FrostBreath({ 
                                    name: 'Frost Breath', 
                                    bonusesDescription: 'Access to the Race Action Frost Breath' }) }), 
                            parent: dragonbornRace._id })
                    ])
                })
        )
        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(console.error)