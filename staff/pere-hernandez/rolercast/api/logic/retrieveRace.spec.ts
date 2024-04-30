import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { Race, User } from '../data/schemas/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('retrieveRace', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves an existing race', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                .then(user => Race.create({ name: 'Human', description: 'I am a Human'})
                    .then(race => logic.retrieveRace(user.id, race.id))
                    .then(race => {
                        expect(race.name).to.equal('Human')
                        expect(race.description).to.equal('I am a Human')
                    })
            )        
        )
    )

    it('does nothing on non-existing user', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                .then(user => Race.create({ name: 'Human', description: 'I am a Human'})
                    .then(race => {
                        const userId = new ObjectId().toString()

                        logic.retrieveRace(userId, race.id)
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.missatge).to.equal('user not found')
                    })
            )        
        )
    )

    it('fails on non-existing race', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                .then(user => Race.create({ name: 'Human', description: 'I am a Human'})
                    .then(race => {
                        const raceId = new ObjectId().toString()

                        logic.retrieveRace(user.id, raceId)
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.missatge).to.equal('race not found')
                    })
            )        
        )
    )

    it('fails on non-string userId', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
                .then(user => {
                    const userId = new ObjectId()

                    Race.create({ name: 'Human', description: 'I am a Human'})
                    //@ts-ignore
                    .then(race => logic.retrieveRace(userId, race.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(TypeError)
                        expect(error.message).to.equal(`userId ${userId} is not a string`)
                    })
                })
    )

    it('fails on non-srting raceId', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
                .then(user => {
                    const raceId = new ObjectId()

                    Race.create({ name: 'Human', description: 'I am a Human'})
                    //@ts-ignore
                    .then(race => logic.retrieveRace(user.id, raceId))
                    .catch(error => {
                        expect(error).to.be.instanceOf(TypeError)
                        expect(error.message).to.equal(`raceId ${raceId} is not a string`)
                    })
                })
    )

    after(() => mongoose.disconnect())
})