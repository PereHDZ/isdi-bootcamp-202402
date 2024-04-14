import { MongoClient } from "mongodb"
import logic from "./index.ts"
import { expect } from 'chai'
import { errors } from 'com'

const { CredentialsError, DuplicityError } = errors

describe('registerUser', () => {
    let client, users

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then(connection => {
                const db = connection.db('test')

                users = db.collection('users')

                logic.users = users

                done()
            })
            .catch(done)
    })

    it('creates a new user', done => {
        users.deleteMany()
            .then(() => {
                logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', error => {
                    if (error){
                        done(error)

                        return
                    }

                    users.findOne({ username:'PereHDZ' })
                        .then(user => {
                            try{
                                expect(!!user).to.be.true
                                expect(user.username).to.equal('PereHDZ')
                                expect(user.email).to.equal('perehdz@hotmail.com')
                                expect(user.password).to.equal('cuquis1992')
    
                                done()
                            } catch (error) {
                                done(error)
                            }
                        })
                        .catch(done)
                })
            })
            .catch(done)
    })

    it('fails on non-matching passwords', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(() => {
                        try {
                            logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cukis1992', error => {
                                try{
                                    expect(error).to.be.instanceOf(CredentialsError)
                                    expect(error.message).to.equal('passwords do not match')
        
                                    done()
                                } catch (error) {
                                    done(error)
                                }
                            })
                        } catch (error) {
                            done(error)
                        }
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(() => {
                        try {
                            logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', error => {
                                try{
                                    expect(error).to.be.instanceOf(DuplicityError)
                                    expect(error.message).to.equal('user already exists')
        
                                    done()
                                } catch (error) {
                                    done(error)
                                }
                            })
                        } catch (error) {
                            done(error)
                        }
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on non-string username', () => {
        const username = 26
        let errorThrown

        try{
            //@ts-ignore
            logic.registerUser(username, 'unknown@unknown.com', 'fails2024', 'fails2024', () => {})
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
            logic.registerUser(empty, 'unknown@unknown.com', 'fails2024', 'fails2024', () => {})
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('username >< is empty or blank')
    })

    it ('fails on non-valid email', () => {
        let errorThrown

        try {
            logic.registerUser('PereHDZ', 'I am not an email', 'cuquis1992', 'cuquis1992', () => {})
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('email I am not an email is not an email')
    })

    it ('fails on non-valid password', () => {
        let errorThrown

        try {
            logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'I am not a valid password', 'cuquis1992', () => {})
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('password is not acceptable')
    })

    it ('fails on non-Function callback', () => {
        const callback = 'I am not a Function'
        let errorThrown

        try {
            //@ts-ignore
            logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', callback)
        } catch (error) {
            errorThrown = error
        }
        
        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('callback is not a Function')
    })


    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})