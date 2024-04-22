import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { DuplicityError, CredentialsError, ContentError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('creates a new user', () => 
        User.deleteMany()
        .then(() => logic.registerUser('PereHDZ', 'pere@hdz.com', 'cuquis1992', 'cuquis1992'))
        .then(() => User.findOne({ username: 'PereHDZ' }))
            .then(user => {
                expect(!!user).to.be.true
                expect(user.username).to.equal('PereHDZ')
                expect(user.email).to.equal('pere@hdz.com')
                expect(user.password).to.equal('cuquis1992')
                expect(user.avatar).to.be.null
            })
    )

    it('fails on existing user', () => 
        User.deleteMany()
        .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null }))
        .then(() => logic.registerUser('PereHDZ', 'pere@hdz.com', 'cuquis1992', 'cuquis1992'))
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('user already exists')
            })
    )

    it('fails on non-equal password and confirmedPassword', () => 
        User.deleteMany()
        .then(() => {
            let errorThrwon

            try {
                logic.registerUser('PereHDZ', 'pere@hdz.com', 'cuquis1992', 'cukis1992')
            } catch (error) {
                errorThrwon = error
            }

            expect(errorThrwon).to.be.instanceOf(CredentialsError)
            expect(errorThrwon.message).to.equal('passwords do not match')
        })
    )

    it('fails on non-string username', () => 
        User.deleteMany()
        .then(() => {
            let username = 26
            let errorThrwon

            try {
                //@ts-ignore
                logic.registerUser(username, 'pere@hdz.com', 'cuquis1992', 'cuquis1992')
            } catch (error) {
                errorThrwon = error
            }

            expect(errorThrwon).to.be.instanceOf(TypeError)
            expect(errorThrwon.message).to.equal('username 26 is not a string')
        })
    )

    it('fails on an empty username', () => 
        User.deleteMany()
        .then(() => {
            let username = ''
            let errorThrwon

            try {
                logic.registerUser(username, 'pere@hdz.com', 'cuquis1992', 'cuquis1992')
            } catch (error) {
                errorThrwon = error
            }

            expect(errorThrwon).to.be.instanceOf(ContentError)
            expect(errorThrwon.message).to.equal('username >< is empty or blank')
        })
    )

    it('fails on an invalid email', () => 
        User.deleteMany()
        .then(() => {
            let errorThrwon

            try {
                logic.registerUser('PereHDZ', 'email', 'cuquis1992', 'cuquis1992')
            } catch (error) {
                errorThrwon = error
            }

            expect(errorThrwon).to.be.instanceOf(ContentError)
            expect(errorThrwon.message).to.equal('email email is not an email')
        })
    )

    it('fails on an invalid password', () => 
        User.deleteMany()
        .then(() => {
            let errorThrwon

            try {
                logic.registerUser('PereHDZ', 'pere@hdz.com', 'password', 'password')
            } catch (error) {
                errorThrwon = error
            }

            expect(errorThrwon).to.be.instanceOf(ContentError)
            expect(errorThrwon.message).to.equal('password is not an acceptable password')
        })
    )

    after(() => mongoose.disconnect())
})