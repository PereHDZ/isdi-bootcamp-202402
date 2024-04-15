import mongoose from "mongoose"

import { User } from '../data/index.ts'

import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { CredentialsError, NotFoundError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    it('succeeds on existing user and right credentials', () => User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(user => logic.authenticateUser('PereHDZ', 'cuquis1992')
                .then(userId => {
                    expect(userId).to.be.a('string')
                    expect(userId).to.equal(user.id)
                })        
            )
    )

    it('fails on existing user and incorrect password', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(() => logic.authenticateUser('PereHDZ', 'cukis1992')
                .catch(error => {
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal('wrong password')
                })
            )
    )

    it ('fails on non-existing username', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(() => logic.authenticateUser('perehdz', 'cuquis1992')
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')
                })
            )
    )

    it('fails on non-string username', () => {
        const username = 26
        let errorThrown

        try{
            //@ts-ignore
            logic.authenticateUser(username, 'cuquis1992')
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
            logic.authenticateUser(empty, 'fails2024')
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('username >< is empty or blank')
    })

    it ('fails on non-valid password', () => {
        let errorThrown
        let password = 'I am not a valid password'

        try {
            logic.authenticateUser('PereHDZ', password)
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('password is not acceptable')
    })

    after(() => mongoose.disconnect())
})