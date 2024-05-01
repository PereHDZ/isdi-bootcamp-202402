import dotenv from 'dotenv'

import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

import { User, CharacterClass } from '../data/models/index.ts'

dotenv.config()

const { } = errors

describe ('retrieveCharacterClasses', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it ('retrieves all characterClasses for existing user', () => 
        Promise.all([
            User.deleteMany(),
            CharacterClass.deleteMany()
        ])
            .then(() => 
                User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                    .then(user => 
                        Promise.all([
                            CharacterClass.create({ name:  'Barbarian', description: 'I am a Barbarian', hp: 12 }),
                            CharacterClass.create({ name: 'Wizard', description: 'I am a Wizard', hp: 6 }),
                            CharacterClass.create({ name: 'Rouge', description: 'I am a Rouge', hp: 8 })
                        ])
                            .then(([characterClass1, characterClass2, characterClass3]) => 
                                logic.retrieveCharacterClasses(user.id)
                                    .then(characterClasses => {
                                        expect(characterClasses).to.have.lengthOf(3)

                                        const foundCharacterClass1 = characterClasses.find(characterClass => characterClass.name === characterClass1.name)

                                        expect(foundCharacterClass1.name).to.equal('Barbarian')
                                        expect(foundCharacterClass1.description).to.equal('I am a Barbarian')
                                        expect(foundCharacterClass1.hp).to.equal(12)

                                        const foundCharacterClass2 = characterClasses.find(characterClass => characterClass.name === characterClass2.name)

                                        expect(foundCharacterClass2.name).to.equal('Wizard')
                                        expect(foundCharacterClass2.description).to.equal('I am a Wizard')
                                        expect(foundCharacterClass2.hp).to.equal(6)

                                        const foundCharacterClass3 = characterClasses.find(characterClass => characterClass.name === characterClass3.name)

                                        expect(foundCharacterClass3.name).to.equal('Rouge')
                                        expect(foundCharacterClass3.description).to.equal('I am a Rouge')
                                        expect(foundCharacterClass3.hp).to.equal(8)
                                    }) 
                            )
                    )
            )
    )

    it('fails on non-string userId', () => 
        Promise.all([
            User.deleteMany(),
            CharacterClass.deleteMany()
        ])
            .then(() => 
                User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                    .then(user => 
                        Promise.all([
                            CharacterClass.create({ name: 'Barbarian', description: 'I am a Barbarian'}),
                            CharacterClass.create({ name: 'Wizard', description: 'I am a Wizard'}),
                            CharacterClass.create({ name: 'Rouge', description: 'I am a Rouge'}),
                        ])
                            .then(([characterClass1, characterClass2, characterClass3]) => {
                                let errorThrown
                                const userId = 26

                                try {
                                    //@ts-ignore
                                    logic.retrieveCharacterClasses(userId)
                                } catch (error) {
                                    errorThrown = error
                                }

                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('userId 26 is not a string')
                            })
                    )
            )
    )

    after(mongoose.disconnect)
})