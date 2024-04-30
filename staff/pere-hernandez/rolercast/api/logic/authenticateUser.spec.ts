import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { User } from '../data/models/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { NotFoundError, CredentialsError, ContentError } = errors

describe('autehnticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds on existing user and correct credentials', () => 
        User.deleteMany()
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(user => 
                logic.authenticateUser('PereHDZ', 'cuquis1992')
                    .then(userId => {
                        expect(userId).to.be.a('string')
                        expect(userId).to.equal(user.id)
                    })
            )
    )

    it('fails on non-existing username', () => 
        User.deleteMany()
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(() => logic.authenticateUser('perehdz', 'cuquis1992'))
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')
                })
    )

    it('fails on existing username and wrong password', () => 
        User.deleteMany()
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(() => logic.authenticateUser('PereHDZ', 'kukis1992'))
                .catch(error => {
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal('incorrect password')
                })
    )

    it('fails on non-string username', () => 
        User.deleteMany()
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(() => {
                const username = 26
                let errorThrown

                try {
                    //@ts-ignore
                    logic.authenticateUser(username, 'cuquis1992')
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('username 26 is not a string')
            })
    )

    it('fails on non-acceptable password', () => 
        User.deleteMany()
            .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
            .then(() => {
                const password = 26
                let errorThrown

                try {
                    //@ts-ignore
                    logic.authenticateUser('PereHDZ', password)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(ContentError)
                expect(errorThrown.message).to.equal('password is not an acceptable password')
            })
    )

    after(() => mongoose.disconnect())
})