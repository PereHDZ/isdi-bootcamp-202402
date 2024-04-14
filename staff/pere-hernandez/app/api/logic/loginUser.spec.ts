import { MongoClient, ObjectId } from "mongodb"
import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { CredentialsError, NotFoundError,StatusError } = errors

describe('loginUser', () => {
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

    it('logs in existing user on right credentials', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                    .then(result => {
                        logic.loginUser('PereHDZ', 'cuquis1992', (error, userId) => {
                            if (error) {
                                done(error)

                                return
                            }

                            try{
                                expect(userId).to.be.a('string')
                                expect(userId).to.equal(result.insertedId.toString())
                            } catch(error) {
                                done(error)
                            }

                            users.findOne({ _id: new ObjectId(userId) })
                                .then(user => {
                                    try {
                                        expect(user.status).to.equal('online')

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
            .catch(done)
    })

    it('fails on existing user and incorrect password', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                    .then(() => {
                        logic.loginUser('PereHDZ', 'cukis1992', (error, userId) => {
                            try{
                                expect(error).to.be.instanceOf(CredentialsError)
                                expect(error.message).to.equal('wrong password')
                                expect(userId).to.be.undefined

                                done()
                            } catch (error) {
                                done(error)
                            }
                        })
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on user already online', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'online' })
                    .then(() => {
                        logic.loginUser('PereHDZ', 'cuquis1992', (error, userId) => {
                            try {
                                expect(error).to.be.instanceOf(StatusError)
                                expect(error.message).to.equal('user is already online')
                                expect(userId).to.be.undefined

                                done()
                            } catch (error) {
                                done(error)
                            }
                        })
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it ('fails on non-existing username', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                    .then(() => {
                        logic.loginUser('perehdz', 'cuquis1992', (error, userId) => {
                            try {
                                expect(error).to.be.instanceOf(NotFoundError)
                                expect(error.message).to.equal('user not found')
                                expect(userId).to.be.undefined

                                done()
                            } catch (error) {
                                done(error)
                            }
                        })
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
            logic.loginUser(username, 'cuquis1992', () => {})
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
            logic.loginUser(empty, 'fails2024', () => {})
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
            logic.loginUser('PereHDZ', password, () => {})
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
            logic.loginUser('PereHDZ', 'cuquis1992', callback)
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