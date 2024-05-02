import mongoose from 'mongoose'

import { Spell } from '../models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => Spell.deleteMany())
        .then(() => 
            Promise.all([
                Spell.create({ name: 'Animal Friendship', description: 'Convince a beast not to attack you.' }),
                Spell.create({ name: 'Armour of Agathys', description: 'Gain 5 temporary hit points and deal 5 Cold Damage to any creature that hits you with a melee attack.' }),
                Spell.create({ name: 'Arms of Hadar', description: 'Prevent targets from taking reactions.' }),
                Spell.create({ name: 'Bane', description: 'Up to 3 creatures receive a -1d4 penalty to Attack Rolls and Saving Throws.' }),
                Spell.create({ name: 'Bless', description: 'Bless up to 3 creatures. They gain a +1d4 bonus to Attack Rolls and Saving Throws.' }),
                Spell.create({ name: 'Burning Hands', description: 'Each flammable target is hit with 3∼18 Fire damage.' }),
                Spell.create({ name: 'Charm Person', description: 'Charm a humanoid to prevent it from attacking you. You gain Advantage on Charisma Checks in dialogue. Enemies have Advantage on Saving Throws against being Charmed.' }),
                Spell.create({ name: 'Chromatic Orb', description: 'Hurl a sphere that deals 3~24 Thunder damage and possibly creates a surface on impact. Alternatively, choose a different type of damage.' }),
                Spell.create({ name: 'Chromatic Orb: Acid', description: 'Hurl a sphere of acid energy.' }),
                Spell.create({ name: 'Chromatic Orb: Cold', description: 'Hurl a sphere of frozen energy.' }),
                Spell.create({ name: 'Chromatic Orb: Fire', description: 'Hurl a sphere of fire.' }),
                Spell.create({ name: 'Chromatic Orb: Lightning', description: 'Hurl a sphere of lightning energy.' }),
                Spell.create({ name: 'Chromatic Orb: Poison', description: 'Hurl a sphere of poisonous energy.' }),
                Spell.create({ name: 'Chromatic Orb: Thunder', description: 'Hurl a sphere that deals 3-24 Thunder damage and possibly creates a surface on impact. Alternatively, choose a different type of damage.' }),
                Spell.create({ name: 'Colour Spray', description: 'Blind creatures up to a combined 33 hit points.' }),
                Spell.create({ name: 'Command', description: 'Command a creature to flee, move closer, freeze, drop to the ground, or drop its weapon.' }),
                Spell.create({ name: 'Compelled Duel', description: 'Compel an enemy to attack only you. It cannot attack other creatures.' }),
                Spell.create({ name: 'Create or Destroy Water', description: 'Call forth rain or destroy a water-based.' }),
                Spell.create({ name: 'Cure Wounds', description: 'Heal a creature you can touch.' }),
                Spell.create({ name: 'Disguise Self', description: 'Magically change all aspects of your appearance' }),
                Spell.create({ name: 'Dissonant Whispers', description: 'Frighten a creature: it will be easier to hit and cannot move' }),
                Spell.create({ name: 'Divine Favour', description: 'Your weapon attacks deal an additional 1∼4 Radiant Damage.' }),
                Spell.create({ name: 'Ensnaring Strike', description: 'Your attack summons thorny vines that possibly Ensnare your target.' }),
                Spell.create({ name: 'Entangle', description: 'Create a vine surface, slowing down creatures, possibly Entangling them.' }),
                Spell.create({ name: 'Expeditious Retreat' , description: 'Gain Dash immediately and as a bonus action on each of your turns until this spell ends.' }),
                Spell.create({ name: 'Faerie Fire', description: 'All targets within the light turn visible, and Attack Rolls against them have Advantage.' }),
                Spell.create({ name: 'False Life', description: 'Gain 7 temporary hit points' }),
                Spell.create({ name: 'Feather Fall', description: 'You and nearby allies gain Immunity to Falling damage' }),
                Spell.create({ name: 'Find Familiar', description: 'Summon a familiar, a fey spirit that takes an animal form of your choosing.' }),
                Spell.create({ name: 'Fog Cloud', description: 'The cloud Blinds and Heavily Obscures creatures within it.' }),
                Spell.create({ name: 'Goodberry', description: "Conjure four magical berries into your or a companion's inventory. Creatures who eat a berry regain 1~4 hit points. Berries disappear after a Long Rest" }),
                Spell.create({ name: 'Grease', description: 'Cover the ground in grease, slowing creatures within and possibly making them fall Prone.' }),
                Spell.create({ name: 'Guiding Bolt', description: 'The next Attack Roll on this target has Advantage.' }),
                Spell.create({ name: 'Hail of Thorns', description: 'The thorns deal Weapon Damage to the target and then explode. The explosion deals an additional 1~10 Piercing damage to the target and surrounding creatures.' }),
                Spell.create({ name: 'Healing Word', description: 'Heal a creature you can see..' }),
                Spell.create({ name: 'Hellish Rebuke', description: 'React to your next attacker with flames that deal 2~20 Fire damage' }),
                Spell.create({ name: 'Heroism', description: 'Make yourself or a target immune to Frightened and gain 5 temporary hit points each turn' }),
                Spell.create({ name: 'Hex', description: 'Make your attacks deal an additional 1~6 Necrotic damage to the target and give it Disadvantage on an Ability of your choosing.\n If the target dies before the spell ends, you can Hex a new creature without expending a spell slot' }),
                Spell.create({ name: "Hunter's Mark", description: 'Mark a creature as your quarry to deal an additional 1~6 whenever you hit it with a weapon attack.\n If the target dies before the spell ends, you can mark a new creature without expanding a spell slot.' }),
                Spell.create({ name: 'Ice Knife', description: 'Throw a shard of ice that deals 1∼10 Piercing damage. It explodes and deals 2∼12 Cold damage to anyone nearby creating an ice surface.\n This spell can be cast while you are Silenced.' }),
                Spell.create({ name: 'Inflict Wounds', description: 'Putrify a creature with the necrotic energy filling your hands' }),
                Spell.create({ name: 'Enhance Leap', description: "Triple a creature's jumping distance." }),
                Spell.create({ name: 'Longstrider', description: "Increase a creature's movement speed by 3m." }),
                Spell.create({ name: 'Lunar Mend', description: 'Expend spell slots to regain hit points while in Wild Shape.' }),
                Spell.create({ name: 'Mage Armour', description: 'Protect a target from attacks: increase its Armour Class to 13 + its Dexterity modifier.' }),
                Spell.create({ name: 'Magic Missile', description: 'Shoot 3 magical darts, each dealing 2∼5 Force damage. They always hit their target.' }),
                Spell.create({ name: 'Protect from Evil and Good', description: "Protect an ally against the attacks and powers of aberrations, celestials, elementals, fey, fiends, and undead. \nThe target can't be Charmed, Frightened, or possessed by them, and when these creatures attack it, they have Disadvantage" }),
                Spell.create({ name: 'Ray of Sickness', description: 'Possibly Poisons the target.' }),
                Spell.create({ name: 'Sanctuary', description: 'You or an ally cannot be targeted until you attack or harm a creature. You can still take damage from area spells.\n Until the affected entity attacks or harms another creature, it cannot be targeted by enemy attacks. However, it can still take damage from spells that influence a large area' }),
                Spell.create({ name: 'Searing Smite', description: 'Deal an extra 1~6 Fire damage and set your target on fire: it takes 1~6 Fire damage every turn' }),
                Spell.create({ name: 'Shield', description: 'When you are about to be hit by an enemy, increase your Armour Class by 5. You take no damage from Magic Missile.' }),
                Spell.create({ name: 'Shield of Faith', description: 'Protect a creature from attacks: increase its Armour Class by 2' }),
                Spell.create({ name: 'Sleep', description: 'Put creatures into a magical slumber. Select targets up to a combined 24 hit points.' }),
                Spell.create({ name: 'Speak With Animals', description: 'Gain the ability to comprehend and communicate with beasts.' }),
                Spell.create({ name: "Tasha's Hideous Laughter", description: 'Leave a creature Prone with laughter, without the ability to get up.' }),
                Spell.create({ name: 'Thunderous Smite', description: 'Pushes your target 3m away and possibly knocks it Prone.' }),
                Spell.create({ name: 'Thunderwave', description: 'Release a wave of thunderous force that pushes away all creatures and objects' }),
                Spell.create({ name: 'Wrathfull Smite', description: 'Possibly Frightens your target. They will be easier to hit and cannot move.' }),
                Spell.create({ name: 'Witch Bolt', description: 'Link yourself to a target with a bolt of lightning. Deal an additional 1~12 Lightning damage each turn by activating it.' })
            ]).then(spells => spells.forEach(spell => console.log(spell))) 
        )
        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(console.error)