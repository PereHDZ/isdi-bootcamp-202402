import { MongoClient, ObjectId } from "mongodb"
import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { NotFoundError } = errors

describe('retrievePosts', () => {
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

    it('retrieves all posts for existing user', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                let insertedPosts = []

                                const insertedPost1 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBla24yYjdqazE1M3FudDQxcmgyanB5dGc0eTRvc2hxcXh2ZHk1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPrwk5SCKWexkLS/giphy.gif', comment: 'One', date: new Date }

                                posts.insertOne(insertedPost1)
                                    .then(() => {
                                        insertedPosts.push(insertedPost1)

                                        const insertedPost2 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4eDNzb2N1NHRwMjJtbTZzYTF6ZjJ1MG1maDA5OXZrNjFiZWllaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AE7Qa6j57XuRzeMkgh/giphy.gif', comment: 'Two', date: new Date }

                                        posts.insertOne(insertedPost2)
                                            .then(() => {
                                                insertedPosts.push(insertedPost2)

                                                const insertedPost3 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlzazBjbGx2dTEyazZ2NjdobmVzMmkyem5ua2k3aWZncGx3anM5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date }

                                                posts.insertOne(insertedPost3)
                                                    .then(() => { 
                                                        logic.retrievePosts(result.insertedId.toString(), (error, posts) => {
                                                            if (error) {
                                                                done(error)

                                                                return
                                                            }
                                                            expect(posts).to.have.lengthOf(3)

                                                            const post1 = posts[2]

                                                            expect(post1.author.username).to.equal('PereHDZ')
                                                            expect(post1.author.id).to.equal(result.insertedId.toString())
                                                            expect(post1.image).to.equal(insertedPost1.image)
                                                            expect(post1.comment).to.equal(insertedPost1.comment)
                                                            expect(post1.date).to.be.instanceOf(Date)

                                                            const post2 = posts[1]

                                                            expect(post2.author.username).to.equal('PereHDZ')
                                                            expect(post2.author.id).to.equal(result.insertedId.toString())
                                                            expect(post2.image).to.equal(insertedPost2.image)
                                                            expect(post2.comment).to.equal(insertedPost2.comment)
                                                            expect(post2.date).to.be.instanceOf(Date)

                                                            const post3 = posts[0]

                                                            expect(post3.author.username).to.equal('PereHDZ')
                                                            expect(post3.author.id).to.equal(result.insertedId.toString())
                                                            expect(post3.image).to.equal(insertedPost3.image)
                                                            expect(post3.comment).to.equal(insertedPost3.comment)
                                                            expect(post3.date).to.be.instanceOf(Date)

                                                            done()
                                                        })
                                                    })
                                                    .catch(done)
                                            })
                                            .catch(done)
                                    })
                                    .catch(done)
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on orphan post', done=> {
        users.deleteMany() 
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                let insertedPosts = []

                                const insertedPost1 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBla24yYjdqazE1M3FudDQxcmgyanB5dGc0eTRvc2hxcXh2ZHk1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPrwk5SCKWexkLS/giphy.gif', comment: 'One', date: new Date }

                                posts.insertOne(insertedPost1)
                                    .then(() => {
                                        insertedPosts.push(insertedPost1)

                                        const insertedPost2 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4eDNzb2N1NHRwMjJtbTZzYTF6ZjJ1MG1maDA5OXZrNjFiZWllaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AE7Qa6j57XuRzeMkgh/giphy.gif', comment: 'Two', date: new Date }

                                        posts.insertOne(insertedPost2)
                                            .then(() => {
                                                insertedPosts.push(insertedPost2)

                                                const authorId = 'Invalid id'

                                                const insertedPost3 = { author: authorId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlzazBjbGx2dTEyazZ2NjdobmVzMmkyem5ua2k3aWZncGx3anM5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date }

                                                posts.insertOne(insertedPost3)
                                                    .then(() => {
                                                        insertedPosts.push(insertedPost3)

                                                        logic.retrievePosts(result.insertedId.toString(), (error, posts) => {
                                                            expect(error).to.be.instanceOf(NotFoundError)
                                                            expect(error.message).to.equal('post owner not found')
                                                            expect(posts).to.be.undefined

                                                            done()
                                                        })
                                                    })
                                                    .catch(done)
                                            })
                                            .catch(done)
                                    })
                                    .catch(done)
                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on invalid userId', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                let insertedPosts= []

                                const insertedPost1 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBla24yYjdqazE1M3FudDQxcmgyanB5dGc0eTRvc2hxcXh2ZHk1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPrwk5SCKWexkLS/giphy.gif', comment: 'One', date: new Date }

                                posts.insertOne(insertedPost1)
                                    .then(() => {
                                        insertedPosts.push(insertedPost1)

                                        const insertedPost2 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4eDNzb2N1NHRwMjJtbTZzYTF6ZjJ1MG1maDA5OXZrNjFiZWllaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AE7Qa6j57XuRzeMkgh/giphy.gif', comment: 'Two', date: new Date }

                                        posts.insertOne(insertedPost2)
                                            .then(() => {
                                                insertedPosts.push(insertedPost2)

                                                const insertedPost3 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlzazBjbGx2dTEyazZ2NjdobmVzMmkyem5ua2k3aWZncGx3anM5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date }

                                                posts.insertOne(insertedPost3)
                                                    .then(() => {
                                                        insertedPosts.push(insertedPost3)

                                                        logic.retrievePosts(new ObjectId().toString(), (error, posts) => {
                                                            expect(error).to.be.instanceOf(NotFoundError)
                                                            expect(error.message).to.equal('user not found')
                                                            expect(posts).to.be.undefined

                                                            done()
                                                        })
                                                    })
                                                    .catch(done)
                                            })
                                            .catch(done)
                                    })
                                    .catch(done)
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
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                            .then(result => {
                                let insertedPosts= []

                                const insertedPost1 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBla24yYjdqazE1M3FudDQxcmgyanB5dGc0eTRvc2hxcXh2ZHk1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPrwk5SCKWexkLS/giphy.gif', comment: 'One', date: new Date }

                                posts.insertOne(insertedPost1)
                                    .then(() => {
                                        insertedPosts.push(insertedPost1)

                                        const insertedPost2 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4eDNzb2N1NHRwMjJtbTZzYTF6ZjJ1MG1maDA5OXZrNjFiZWllaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AE7Qa6j57XuRzeMkgh/giphy.gif', comment: 'Two', date: new Date }

                                        posts.insertOne(insertedPost2)
                                            .then(() => {
                                                insertedPosts.push(insertedPost2)

                                                const insertedPost3 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlzazBjbGx2dTEyazZ2NjdobmVzMmkyem5ua2k3aWZncGx3anM5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date }

                                                posts.insertOne(insertedPost3)
                                                    .then(() => {
                                                        insertedPosts.push(insertedPost3)

                                                        const userId = new ObjectId()
                                                        let errorThrown

                                                        try {
                                                            //@ts-ignore
                                                            logic.retrievePosts(userId, () => {})
                                                        } catch (error) {
                                                            errorThrown = error
                                                        }                                                        
                                                        expect(errorThrown).to.be.instanceOf(TypeError)
                                                        expect(errorThrown.message).to.equal(`userId ${userId} is not a string`)

                                                        done()
                                                        
                                                    })
                                                    .catch(done)
                                            })
                                            .catch(done)
                                    })
                                    .catch(done)
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
                                let insertedPosts = []

                                const insertedPost1 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBla24yYjdqazE1M3FudDQxcmgyanB5dGc0eTRvc2hxcXh2ZHk1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPrwk5SCKWexkLS/giphy.gif', comment: 'One', date: new Date }

                                posts.insertOne(insertedPost1)
                                    .then(() => {
                                        insertedPosts.push(insertedPost1)

                                        const insertedPost2 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4eDNzb2N1NHRwMjJtbTZzYTF6ZjJ1MG1maDA5OXZrNjFiZWllaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AE7Qa6j57XuRzeMkgh/giphy.gif', comment: 'Two', date: new Date }

                                        posts.insertOne(insertedPost2)
                                            .then(() => {
                                                insertedPosts.push(insertedPost2)

                                                const insertedPost3 = { author: result.insertedId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlzazBjbGx2dTEyazZ2NjdobmVzMmkyem5ua2k3aWZncGx3anM5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date }

                                                posts.insertOne(insertedPost3)
                                                    .then(() => {
                                                        insertedPosts.push(insertedPost3)

                                                        let errorThrown
                                                        const callback = 'I am not a Function'

                                                        try {
                                                            //@ts-ignore
                                                            logic.retrievePosts(result.insertedId.toString(), callback)
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