import { MongoClient, ObjectId } from "mongodb"
import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { NotFoundError } = errors

describe('retrieveUser', () => {
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

    it('retrieve existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(result => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(result2 => {
                                logic.retrieveUser(result.insertedId.toString(), result2.insertedId.toString(), (error, user) => {
                                    if (error) {
                                        done(error)

                                        return
                                    }

                                    try {
                                        expect(user.id).to.be.undefined
                                        expect(user.username).to.equal('perico')
                                        expect(user.email).to.equal('perico@palotes.com')
                                        expect(user.password).to.be.undefined
                                        expect(user.status).to.be.undefined

                                        done()
                                    } catch (done) {
                                        done(error)
                                    }
                                })
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('does nothing on called by non-existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(() => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(result => {
                                logic.retrieveUser(new ObjectId().toString(), result.insertedId.toString(), (error, user) => {
                                    try {
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal('user not found')

                                        expect(user).to.be.undefined

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
            .catch(done)
    })

    it ('does nothing on non-existing target user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(result => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(() => {
                                logic.retrieveUser(result.insertedId.toString(), new ObjectId().toString(), (error, user) => {
                                    try {
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal('target user not found')
        
                                        expect(user).to.be.undefined
        
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
            .catch(done)
    })

    it('fails on non-string userId', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(() => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(result => {
                                const userId = 26
                                let errorThrown

                                try{
                                    //@ts-ignore
                                    logic.retrieveUser(userId, result.insertedId.toString(), () => {})
                                } catch (error) {
                                    errorThrown = error
                                }

                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('userId 26 is not a string')

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on empty userId', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(() => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(result => {
                                let errorThrown

                                try {
                                    logic.retrieveUser('', result.insertedId.toString(), () => {})
                                } catch (error) {
                                    errorThrown = error
                                }
                                expect(errorThrown).to.be.instanceOf(Error)
                                expect(errorThrown.message).to.equal('userId >< is empty or blank')

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on non-string targetUserId', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(result => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(() => {
                                const targetUserId = 26
                                let errorThrown

                                try{
                                    //@ts-ignore
                                    logic.retrieveUser(result.insertedId.toString(), targetUserId, () => {})
                                } catch (error) {
                                    errorThrown = error
                                }

                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('targetUserId 26 is not a string')

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on empty targetUserId', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(result => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(() => {
                                let errorThrown

                                try {
                                    logic.retrieveUser( result.insertedId.toString(), '', () => {})
                                } catch (error) {
                                    errorThrown = error
                                }
                                expect(errorThrown).to.be.instanceOf(Error)
                                expect(errorThrown.message).to.equal('targetUserId >< is empty or blank')

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on non-Function callback', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                    .then(result => {
                        users.insertOne({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                            .then(result2 => {
                                const callback = 'I am not a Function'
                                let errorThrown

                                try{
                                    //@ts-ignore
                                    logic.retrieveUser(result.insertedId.toString(), result2.insertedId.toString(), callback)
                                } catch (error) {
                                    errorThrown = error
                                }
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('callback is not a Function')

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})