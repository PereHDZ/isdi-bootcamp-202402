import dotenv from 'dotenv'

import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

import { User, Race, RaceType } from '../data/index.ts'

dotenv.config()

const { NotFoundError } = errors

describe('retrieveRaces', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves all races for existing user', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => 
                User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                    .then(user => 
                        Promise.all([
                            Race.create({ name: 'Human', description: 'I am a Human'}),
                            Race.create({ name: 'Elf', description: 'I am an Elf'}),
                            Race.create({ name: 'Dwarf', description: 'I am a Dwarf'}),
                        ])
                            .then(([race1, race2, race3]) => 
                                logic.retrieveRaces(user.id)
                                    .then(races => {
                                        expect(races).to.have.lengthOf(3)

                                        const foundRace1 = races.find(race => race.name === race1.name)

                                        expect(foundRace1.name).to.equal('Human')
                                        expect(foundRace1.description).to.equal('I am a Human')

                                        const foundRace2 = races.find(race => race.name === race2.name)

                                        expect(foundRace2.name).to.equal('Elf')
                                        expect(foundRace2.description).to.equal('I am an Elf')

                                        const foundRace3 = races.find(race => race.name === race3.name)

                                        expect(foundRace3.name).to.equal('Dwarf')
                                        expect(foundRace3.description).to.equal('I am a Dwarf')
                                    })
                            )
                    )
            )
    )

    it('fails on incorrect userId', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => 
                User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                    .then(user => 
                        Promise.all([
                            Race.create({ name: 'Human', description: 'I am a Human'}),
                            Race.create({ name: 'Elf', description: 'I am an Elf'}),
                            Race.create({ name: 'Dwarf', description: 'I am a Dwarf'}),
                        ])
                            .then(([race1, race2, race3]) => {
                                const userId = '26'

                                logic.retrieveRaces(userId)
                                    .catch(error => {
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal('user not found')
                                    })
                            })
                    )
            )
    )


    it('fails on non-string userId', () => 
        Promise.all([
            User.deleteMany(),
            Race.deleteMany()
        ])
            .then(() => 
                User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
                    .then(user => 
                        Promise.all([
                            Race.create({ name: 'Human', description: 'I am a Human'}),
                            Race.create({ name: 'Elf', description: 'I am an Elf'}),
                            Race.create({ name: 'Dwarf', description: 'I am a Dwarf'}),
                        ])
                            .then(([race1, race2, race3]) => {
                                let errorThrown
                                const userId = 26

                                try {
                                    //@ts-ignore
                                    logic.retrieveRaces(userId)
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