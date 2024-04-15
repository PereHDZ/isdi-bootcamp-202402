import mongoose, { mongo } from "mongoose"

const { Types: { ObjectId } } = mongoose

import { User } from '../data/index.ts'

import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { NotFoundError } = errors

describe('retrieveUser', () => {
    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    it('retrieve existing user', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(user => User.create({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                .then(user2 => logic.retrieveUser(user.id, user2.id))
                .then(user => {
                    expect(user.username).to.equal('perico')
                })
            )
    )

    it('does nothing on non-existing user', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(user => User.create({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                .then(user2 => logic.retrieveUser(new ObjectId().toString(), user2.id))
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')
                })
            )
    )

    it ('does nothing on non-existing target user', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(user => 
                User.create({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                    .then(user2 => logic.retrieveUser(user.id, new ObjectId().toString()))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('target user not found')
                    })
            )
    )

    it('fails on non-string userId', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(user => 
                User.create({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                    .then(user2 => {
                        const userId = 26
                        let errorThrown

                        try {
                            //@ts-ignore
                            logic.retrieveUser(userId, user2.id)
                        } catch (error) {
                            errorThrown = error
                        }

                        expect(errorThrown).to.be.instanceOf(Error)
                        expect(errorThrown.message).to.equal('userId 26 is not a string')                        
                    })
            )
    )

    it('fails on empty userId', () => 
        User.deleteMany()
        .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
        .then(user => 
            User.create({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                .then(user2 => {
                    const userId = ''
                    let errorThrown

                    try {
                        //@ts-ignore
                        logic.retrieveUser(userId, user2.id)
                    } catch (error) {
                        errorThrown = error
                    }

                    expect(errorThrown).to.be.instanceOf(Error)
                    expect(errorThrown.message).to.equal('userId >< is empty or blank')                        
                })
            )
    )

    it('fails on non-string targetUserId', () =>
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(user => 
                User.create({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                    .then(user2 => {
                        const userId = 26
                        let errorThrown

                        try {
                            //@ts-ignore
                            logic.retrieveUser(user.id, userId)
                        } catch (error) {
                            errorThrown = error
                        }

                        expect(errorThrown).to.be.instanceOf(TypeError)
                        expect(errorThrown.message).to.equal('targetUserId 26 is not a string')                        
                    })
            )
    )

    it('fails on empty targetUserId', () => 
        User.deleteMany()
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
            .then(user => 
                User.create({ username: 'perico', email: 'perico@palotes.com', password:'palote2024' })
                    .then(user2 => {
                        const userId = ''
                        let errorThrown

                        try {
                            //@ts-ignore
                            logic.retrieveUser(user.id, userId)
                        } catch (error) {
                            errorThrown = error
                        }

                        expect(errorThrown).to.be.instanceOf(Error)
                        expect(errorThrown.message).to.equal('targetUserId >< is empty or blank')                        
                    })
            )
    )

    after(() => mongoose.disconnect())
})