import { MongoClient, ObjectId } from "mongodb"
import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

const { } = errors

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
                                                        insertedPosts.push(insertedPost3)

                                                        logic.retrievePosts(result.insertedId.toString(), (error, posts) => {
                                                            if (error) {
                                                                done(error)

                                                                return
                                                            }

                                                            try{
                                                                expect(posts).to.have.length(3)

                                                                
                                                            } catch (error) {
                                                                done(error)
                                                            }
                                                        })
                                                        
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