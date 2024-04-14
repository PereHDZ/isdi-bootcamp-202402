import { MongoClient, ObjectId } from "mongodb"
import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { NotFoundError, ContentError } = errors

describe('createPost', () => {
    let client, users, posts

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then(connection => {
                const db = connection.db('test')

                users = db.collection('users')
                posts = db.collection('posts')

                logic.users = users
                logic.posts = posts

                done()
            })
            .catch(done)
    })

    it('creates post with image and comment from existing user', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                logic.createPost(result.insertedId.toString(), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', 'Mi compi de piso', error => {
                                    if (error) {
                                        done(error)

                                        return
                                    }

                                    posts.findOne({})
                                        .then(post => {
                                            try{
                                                expect(post.author.toString()).to.equal(result.insertedId.toString())
                                                expect(post.image).to.equal('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)')
                                                expect(post.comment).to.equal('Mi compi de piso')
                                                expect(post.date).to.be.instanceOf(Date)

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
            .catch(done)
    })

    it('fails on userId from unexisting user', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                        .then(() => {
                                logic.createPost(new ObjectId().toString(), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', 'Mi compi de piso', error => {
                                    try {
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal('user not found')

                                        done()
                                    } catch (error) {
                                        done(error)
                                    }
                                })
                        })
                        .catch(done))
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on non-string userId', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                let errorThrown

                                try {
                                    logic.createPost(result.insertedId, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', 'Mi compi de piso', () => {})
                                } catch (error) {
                                    errorThrown = error
                                }
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal(`userId ${result.insertedId} is not a string`)

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it ('fails on non valid url for image', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                const image = 'I am not a valid URL'
                                let errorThrown

                                try {
                                    logic.createPost(result.insertedId.toString(), image, 'Mi compi de piso', () => {})
                                } catch (error) {
                                    errorThrown = error
                                }
                                expect(errorThrown).to.be.instanceOf(ContentError)
                                expect(errorThrown.message).to.equal('image I am not a valid URL is not an url')

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it ('fails on non-string comment', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                const comment = 26
                                let errorThrown

                                try {
                                    //@ts-ignore
                                    logic.createPost(result.insertedId.toString(), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', comment, () => {})
                                } catch (error) {
                                    errorThrown = error
                                }
                                expect(errorThrown).to.be.instanceOf(TypeError)
                                expect(errorThrown.message).to.equal('comment 26 is not a string')

                                done()
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it ('fails on non-Function callback', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                const callback = 'I am not a Function'
                                let errorThrown

                                try {
                                    //@ts-ignore
                                    logic.createPost(result.insertedId.toString(), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', 'Mi compi de piso', callback)
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