import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('retrieveUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves an existing user', () => 
        User.deleteMany()
        .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(user => 
                User.create({ username: 'Armando_Guerra', email: 'armando@guerra.com', password: 'armandola202', avatar: null })
                    .then(user2 => logic.retrieveUser(user.id, user2.id))
                        .then(user => {
                            expect(user.username).to.equal('Armando_Guerra')
                        })
            )
    )

    it('fails on non-existing user', () => 
        User.deleteMany()
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
                .then(user => 
                    User.create({ username: 'Armando_Guerra', email: 'armando@guerra.com', password: 'armandola202', avatar: null })
                        .then(user2 => logic.retrieveUser(new ObjectId().toString(), user2.id))
                            .catch(error => {
                                expect(error).to.be.instanceOf(NotFoundError)
                                expect(error.message).to.equal('user not found')
                            })
                )
    )

    it('fails on non-existing user', () => 
        User.deleteMany()
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
                .then(user => 
                    User.create({ username: 'Armando_Guerra', email: 'armando@guerra.com', password: 'armandola202', avatar: null })
                        .then(user2 => logic.retrieveUser(user.id, new ObjectId().toString()))
                            .catch(error => {
                                expect(error).to.be.instanceOf(NotFoundError)
                                expect(error.message).to.equal('target user not found')
                            })
                )
    )

    it('fails on non-string userId', () => 
    User.deleteMany()
        .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(user => {
                const userId = new ObjectId()

                User.create({ username: 'Armando_Guerra', email: 'armando@guerra.com', password: 'armandola202', avatar: null })
                    .then(user2 => logic.retrieveUser(userId, user2.id))
                        .catch(error => {
                            expect(error).to.be.instanceOf(TypeError)
                            expect(error.message).to.equal(`userId ${userId} is not a string`)
                        })
            })
    )

    it('fails on non-string targetUserId', () => 
    User.deleteMany()
        .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(user => {
                const targetUserId = new ObjectId()

                User.create({ username: 'Armando_Guerra', email: 'armando@guerra.com', password: 'armandola202', avatar: null })
                    .then(user2 => logic.retrieveUser(user.id, targetUserId))
                        .catch(error => {
                            expect(error).to.be.instanceOf(TypeError)
                            expect(error.message).to.equal(`targetUserId ${userId} is not a string`)
                        })
            })
    )

    after(() => mongoose.disconnect())
})