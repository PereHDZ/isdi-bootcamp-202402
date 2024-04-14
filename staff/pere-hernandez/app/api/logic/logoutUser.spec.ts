import { MongoClient, ObjectId } from "mongodb"
import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { NotFoundError, StatusError } = errors

describe('logoutUser', () => {
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

    it('logs out exisiting user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'online' })
                    .then(() => {
                        users.findOne({ username: 'PereHDZ' })
                            .then(user => {
                                const userId = user._id.toString()
                                logic.logoutUser(userId, error => {
                                    if (error){
                                        done(error)

                                        return
                                    }

                                    users.findOne({ _id: new ObjectId(userId) })
                                        .then(user2 => {
                                            expect(user2.status).to.equal('offline')

                                            done()
                                        })
                                        .catch(done)
                                })
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on non-existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                    .then(() => {
                        logic.logoutUser(new ObjectId().toString(), error => {
                            try{
                                expect(error).to.be.instanceOf(NotFoundError)
                                expect(error.message).to.equal('user not found')

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

    it('fails on user already offline', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                    .then(() => {
                        users.findOne({ username: 'PereHDZ' })
                            .then(user => {
                                const userId = user._id.toString()

                                logic.logoutUser(userId, error => {
                                    try{
                                        expect(error).to.be.instanceOf(StatusError)
                                        expect(error.message).to.equal('user is already offline')

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

    it('fails on non-string userId', () => {
        const userId = 26
        let errorThrown

        try{
            //@ts-ignore
            logic.logoutUser(userId, () => {})
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('userId 26 is not a string')
    })

    it('fails on empty userId', () => {
        let userId = ''
        let errorThrown

        try{
            logic.logoutUser(userId, () => {})
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be instanceof(Error)
        expect(errorThrown.message).to.equal('userId >< is empty or blank')
    })

    it('fails on non-Function callback', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'online' })
                    .then(() => {
                        users.findOne({ username: 'PereHDZ' })
                            .then(user => {
                                const userId = user._id.toString()
                                const callback = 'I am not a Function'
                                let errorThrown

                                try {
                                    //@ts-ignore
                                    logic.logoutUser(userId, callback)
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