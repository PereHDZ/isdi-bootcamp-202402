import db from '../data/index.mjs'
import logic from './index.mjs'

import { expect } from 'chai'

describe('logic', () => {
    describe('registerUser', () => {
        it('creates a new user in db', done => {
            db.users.deleteOne(user => user.username === 'PereHDZ', error => {
                if (error){
                    done(error)

                    return
                }

                logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    db.users.findOne(user => user.username === 'PereHDZ', (error, user) => {
                        if (error) {
                            done (error)

                            return
                        }

                        expect(!!user).to.be.true
                        expect(user.username).to.equal('PereHDZ')
                        expect(user.email).to.equal('perehdz@hotmail.com')
                        expect(user.password).to.equal('cuquis1992')

                        done()
                    })
                })
            })
        })

        it('fails on non-matching passwords', done => {
            db.users.deleteOne(user => user.username === 'PereHDZ', error => {
                if (error) {
                    done(error)

                    return
                }

                logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cukis1992', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal("Passwords don't match")

                    done()
                })
            })
        })

        it('fails on existing user', done => {
            db.users.insertOne({username: 'PereHDZ', email: 'perhdz@hotmail.com', password: 'cuquis1992'}, error => {
                if (error) {
                    done(error)

                    return
                }

                logic.registerUser('PereHDZ', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user already exists')

                    done()
                })
            })
        })

        it('fails on non-string username', () => {
            const username = 26
            let errorThrown

            try{
                logic.registerUser(username, 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', () => {})
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown.message).to.equal('username 26 is not a string')
        })

        it ('fails on empty username', () => {
            let errorThrown

            try {
                logic.registerUser('', 'perehdz@hotmail.com', 'cuquis1992', 'cuquis1992', () => {})
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
            db.users.deleteOne(user => user.username === 'PereHDZ', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ username: 'PereHDZ', email: 'perehdz@hotmail.com', password: 'cuquis1992'}, (error, insertedUserID) => {
                    if (error){
                        done(error)

                        return
                    }

                    logic.loginUser('PereHDZ', 'cuquis1992', (error, userId) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(userId).to.equal(insertedUserID)

                        db.users.findOne(user => user.id === userId, (error, user) => {
                            if (error) {
                                done(error)

                                return
                            }

                            expect(user.status).to.equal('online')

                            done()
                        })
                    })
                })
            })
        })
    })
})