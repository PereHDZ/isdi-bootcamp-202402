import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Archetype, Armour, Cantrip, Proficiencies, Skills, Spell, User, Weapons } from '../data/models/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import characterClass from '../data/schemas/characterClass.ts'


dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('retrieveArchetype', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves an existing archetype for a user', () => 
        Promise.all([
            User.deleteMany(),
            Cantrip.deleteMany(),
            Spell.deleteMany(),
            Archetype.deleteMany()
        ])
        .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
            .then(user => Cantrip.create({ name: 'Light', description: 'Creates Light' })
                .then(cantrip => Spell.create({ name: 'Magic Spell', description:"It's magic"})
                    .then(spell => Archetype.create({ name: 'Mage Hunter', description: 'You Hunt Mages', proficiencies: new Proficiencies({ armour: new Armour({ shields: 1 }), weapons: new Weapons({ longbows: 1 }), skills: new Skills({ acrobatics: 1 }) }), knownCantrip: cantrip.id.toString(), knownSpell: spell.id.toString() })
                        .then(archetype => {
                            expect(archetype.name).to.equal('Mage Hunter')
                            expect(archetype.description).to.equal('You Hunt Mages')
                            //expect(archetype.proficiencies).to.be.instanceOf(Proficiencies)
                            // expect(archetype.knownCantrip).to.equal(cantrip.id)
                            // expect(archetype.knownSpell).to.equal(spell.id)
                        })
                    )
                )
            )
        )
    )
    after(() => mongoose.disconnect())
})