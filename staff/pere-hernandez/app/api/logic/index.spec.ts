import mongodb from 'mongodb'
import logic from './index.ts'

import { expect } from 'chai'
import { log } from 'console'

const { MongoClient, ObjectId } = mongodb

describe('logic', () => {
    let client, users, posts

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then(connection => {
                const db = connection.db('test')

                users = db.collection('users')
                posts = db.collection('posts')

                logic.users = users

                done()
            })
            .catch(done)
    })



    describe('registerUser', () => {
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
                                expect(!!user).to.be.true
                                expect(user.username).to.equal('PereHDZ')
                                expect(user.email).to.equal('perehdz@hotmail.com')
                                expect(user.password).to.equal('cuquis1992')

                                done()
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
                            logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cukis1992', error => {
                                expect(error).to.be.instanceOf(Error)
                                expect(error.message).to.equal('passwords do not match')

                                done()
                            })
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
                            logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', error => {
                                expect(error).to.be.instanceOf(Error)
                                expect(error.message).to.equal('user already exists')

                                done()
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
            expect(errorThrown.message).to.equal('password I am not a valid password is not a valid password')
        })

        it ('fails on non-Function callback', () => {
            const callback = 'I am not a callback'
            let errorThrown

            try {
                logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', callback)
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown.message).to.equal('callback is not a Function')
        })
    })


    describe('loginUser', () => {
        it('logs user if it exists and the correct credentials are given', done => {
            users.deleteMany()
                .then(() => {
                    users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                        .then(() => {
                            logic.loginUser('PereHDZ', 'cuquis1992', error => {
                                if (error) {
                                    done(error)

                                    return
                                }

                                users.findOne({ username: 'PereHDZ' })
                                    .then(user => {
                                        expect(user.status).to.equal('online')

                                        done()
                                    })
                                    .catch(done)                                
                            })
                        })
                        .catch(done)
                })
                .catch(done)
        })

        it('fails on existing user but incorrect password', done => {
            users.deleteMany()
                .then(() => {
                    users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                        .then(() => {
                            logic.loginUser('PereHDZ', 'cukis1992', (error, userId) => {
                                expect(error).to.be.instanceOf(Error)
                                expect(error.message).to.equal('wrong credentials')
                                expect(userId).to.be.undefined

                                done()
                            })
                        })
                        .catch(done)
                })
                .catch(done)
        })

        it('fails on non-existing username', done => {
            users.deleteMany()
                .then(() => {
                    users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'offline' })
                        .then(() => {
                            logic.loginUser('perehdz', 'cuquis1992', (error, userId) => {
                                expect(error).to.be.instanceOf(Error)
                                expect(error.message).to.equal('wrong credentials')
                                expect(userId).to.be.undefined

                                done()
                            })
                        })
                        .catch(done)
                })
                .catch(done)
        })
    })

    describe('logoutUser', () => {
        it('changes user status to offline', done => {
            users.deleteMany()
                .then(() => {
                    users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'online' })
                        .then(() => {
                            users.findOne({ username:'PereHDZ' })
                                .then(user => {
                                    const userId = user._id

                                    logic.logoutUser(userId, error => {
                                        if (error) {
                                            done(error)

                                            return
                                        }

                                        users.findOne({ username:'PereHDZ' })
                                            .then(user2 => {
                                                expect(userId).to.deep.equal(user2._id)
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

        /*it ('fails on non-existing user', done => {
            users.deleteMany()
                .then(() => {
                    users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992', status:'online' })
                        .then(
                            logic.logoutUser({_id:'hvkjvlj'}, error => {
                                if (error) {
                                    done(error)

                                    return
                                }
                                done()
                            })
                        )
                        .catch(done)
                })
                .catch(done)
        })*/
    })
    
    /*

    describe('retrieveUser', () => {
        it('retrieves existing user', done => {
            db.users.deleteOne(user => user.username === 'PereHDZ', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ username: 'PereHDZ', email: 'perehdz@hotmail.com', password: 'cuquis123' }, (error, insertedUserId) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.retrieveUser(insertedUserId, (error, user) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(user.id).to.be.undefined
                        expect(user.username).to.equal('PereHDZ')
                        expect(user.email).to.equal('perehdz@hotmail.com')
                        expect(user.password).to.be.undefined
                        expect(user.status).to.be.undefined

                        done()
                    })
                })
            })
        })

        it('does nothing on non-existing user', done => {
            db.users.deleteOne(user => user.username === 'PereHDZ', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'PereHDZ', email: 'perehdz@hotmail.com', password: 'cuquis1992' }, (error, insertedUserId) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.retrieveUser('perehdz', (error, user) => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('user not found')

                        expect(user).to.be.undefined

                        done()
                    })
                })
            })
        })
    })*/

    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})