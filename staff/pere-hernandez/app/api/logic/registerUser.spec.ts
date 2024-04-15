import mongoose from "mongoose"

import { User } from "../data/index.ts"

import logic from "./index.ts"
import { expect } from 'chai'
import { errors } from 'com'

const { CredentialsError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    it('creates a new user', () =>
        User.deleteMany()
            .then(() => logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992'))
            .then(() => User.findOne({ username:'PereHDZ' }))
            .then(user => {
                expect(!!user).to.be.true
                expect(user.username).to.equal('PereHDZ')
                expect(user.email).to.equal('perehdz@hotmail.com')
                expect(user.password).to.equal('cuquis1992')
            })
    )

    it('fails on non-matching passwords', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(() => {
                let errorThrown

                try {
                    logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cukis1992')
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('passwords do not match')
            })                    
    )

    it('fails on existing user', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(() => 
                logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992')
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            )    
    )

    it('fails on non-string username', () => {
        const username = 26
        let errorThrown

        try{
            //@ts-ignore
            logic.registerUser(username, 'unknown@unknown.com', 'fails2024', 'fails2024')
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('username 26 is not a string')
    })

    it('fails on empty username', () => {
        let empty = ''
        let errorThrown

        try{
            logic.registerUser(empty, 'unknown@unknown.com', 'fails2024', 'fails2024')
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('username >< is empty or blank')
    })

    it ('fails on non-valid email', () => {
        let errorThrown

        try {
            logic.registerUser('PereHDZ', 'I am not an email', 'cuquis1992', 'cuquis1992')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('email I am not an email is not an email')
    })

    it ('fails on non-valid password', () => {
        let errorThrown

        try {
            logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'I am not a valid password', 'cuquis1992')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('password is not acceptable')
    })
    
    after(() => mongoose.disconnect())
})