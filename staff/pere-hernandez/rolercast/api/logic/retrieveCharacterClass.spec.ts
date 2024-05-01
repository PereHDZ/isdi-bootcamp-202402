import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { CharacterClass, User } from '../data/models/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import characterClass from '../data/schemas/characterClass.ts'


dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('retrieveCharacterClass', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves an existing character class', () => 
        Promise.all([
            User.deleteMany(),
            CharacterClass.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                .then(user => CharacterClass.create({ name: 'Barbarian', description: 'I am a Barbarian', hp: 12})
                    .then(characterClass => logic.retrieveCharacterClass(user.id, characterClass.id))
                    .then(characterClass => {
                        expect(characterClass.name).to.equal('Barbarian')
                        expect(characterClass.description).to.equal('I am a Barbarian')
                        expect(characterClass.hp).to.equal(12)
                    })
            )        
        )
    )

    it('does nothing on non-existing user', () => 
        Promise.all([
            User.deleteMany(),
            CharacterClass.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                .then(user => CharacterClass.create({ name: 'Barbarian', description: 'I am a Barbarian', hp: 12})
                    .then(characterClass => {
                        const userId = new ObjectId().toString()

                        logic.retrieveCharacterClass(userId, characterClass.id)
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.missatge).to.equal('user not found')
                    })
            )        
        )
    )

    it('fails on non-existing character class', () => 
        Promise.all([
            User.deleteMany(),
            CharacterClass.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                .then(user => CharacterClass.create({ name: 'Barbarian', description: 'I am a Barbarian', hp: 12})
                    .then(characterClass => {
                        const characterClassId = new ObjectId().toString()

                        logic.retrieveRace(user.id, characterClassId)
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.missatge).to.equal('character class not found')
                    })
            )        
        )
    )

    it('fails on non-string userId', () => 
        Promise.all([
            User.deleteMany(),
            CharacterClass.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
                .then(user => {
                    const userId = new ObjectId()

                    CharacterClass.create({ name: 'Barbarian', description: 'I am a Barbarian'})
                    //@ts-ignore
                    .then(race => logic.retrieveCharacterClass(userId, characterClass.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(TypeError)
                        expect(error.message).to.equal(`userId ${userId} is not a string`)
                    })
                })
    )

    it('fails on non-srting characterClassId', () => 
        Promise.all([
            User.deleteMany(),
            CharacterClass.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
                .then(user => {
                    const characterClassId = new ObjectId()

                    CharacterClass.create({ name: 'Barbarian', description: 'I am a Barbarian', hp: 12})
                    //@ts-ignore
                    .then(characterClass => logic.retrieveRace(user.id, characterClassId))
                    .catch(error => {
                        expect(error).to.be.instanceOf(TypeError)
                        expect(error.message).to.equal(`raceId ${characterClassId} is not a string`)
                    })
                })
    )

    after(() => mongoose.disconnect())
})