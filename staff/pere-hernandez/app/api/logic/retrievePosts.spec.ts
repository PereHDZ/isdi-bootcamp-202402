import mongoose, { mongo } from "mongoose"
import logic from "./index.ts"
import { expect } from "chai"
import { errors } from "com"

import { User, Post, PostType } from '../data/index.ts'

const { NotFoundError } = errors

describe('retrievePosts', () => {
    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    it('retrieves all posts for existing user', () => 
        Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])        
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
                .then(user => 
                    Promise.all([
                        Post.create({ author: user.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBla24yYjdqazE1M3FudDQxcmgyanB5dGc0eTRvc2hxcXh2ZHk1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPrwk5SCKWexkLS/giphy.gif', comment: 'One', date: new Date }),
                        Post.create({ author: user.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4eDNzb2N1NHRwMjJtbTZzYTF6ZjJ1MG1maDA5OXZrNjFiZWllaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AE7Qa6j57XuRzeMkgh/giphy.gif', comment: 'Two', date: new Date }),
                        Post.create({ author: user.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlzazBjbGx2dTEyazZ2NjdobmVzMmkyem5ua2k3aWZncGx3anM5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date })
                    ])
                        .then(([post1, post2, post3]) => 
                            logic.retrievePosts(user.id)
                                .then(posts => {
                                    expect(posts).to.have.lengthOf(3)

                                    const foundPost1 = posts.find(post => post.id === post1.id)

                                    expect(foundPost1.author.username).to.equal('PereHDZ')
                                    expect(foundPost1.author.id).to.equal(user.id)
                                    expect(foundPost1.image).to.equal(post1.image)
                                    expect(foundPost1.comment).to.equal(post1.comment)
                                    expect(foundPost1.date).to.deep.equal(post1.date)

                                    const foundPost2 = posts.find(post => post.id === post2.id)

                                    expect(foundPost2.author.username).to.equal('PereHDZ')
                                    expect(foundPost2.author.id).to.equal(user.id)
                                    expect(foundPost2.image).to.equal(post2.image)
                                    expect(foundPost2.comment).to.equal(post2.comment)
                                    expect(foundPost2.date).to.deep.equal(post2.date)

                                    const foundPost3 = posts.find(post => post.id === post3.id)

                                    expect(foundPost3.author.username).to.equal('PereHDZ')
                                    expect(foundPost3.author.id).to.equal(user.id)
                                    expect(foundPost3.image).to.equal(post3.image)
                                    expect(foundPost3.comment).to.equal(post3.comment)
                                    expect(foundPost3.date).to.deep.equal(post3.date)
                                })
                        )
                )
    )

    it('fails on orphan post', () =>
        Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])        
            .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' }))
                .then(user => 
                    Promise.all([
                        Post.create({ author: user.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBla24yYjdqazE1M3FudDQxcmgyanB5dGc0eTRvc2hxcXh2ZHk1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPrwk5SCKWexkLS/giphy.gif', comment: 'One', date: new Date }),
                        Post.create({ author: user.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4eDNzb2N1NHRwMjJtbTZzYTF6ZjJ1MG1maDA5OXZrNjFiZWllaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AE7Qa6j57XuRzeMkgh/giphy.gif', comment: 'Two', date: new Date }),
                        Post.create({ author: '', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlzazBjbGx2dTEyazZ2NjdobmVzMmkyem5ua2k3aWZncGx3anM5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date })
                    ])
                        .then(([post1, post2, post3]) => 
                            logic.retrievePosts(user.id)
                                .then(posts => {
                                    expect(posts).to.have.lengthOf(3)

                                    const foundPost1 = posts.find(post => post.id === post1.id)

                                    expect(foundPost1.author.username).to.equal('PereHDZ')
                                    expect(foundPost1.author.id).to.equal(user.id)
                                    expect(foundPost1.image).to.equal(post1.image)
                                    expect(foundPost1.comment).to.equal(post1.comment)
                                    expect(foundPost1.date).to.deep.equal(post1.date)

                                    const foundPost2 = posts.find(post => post.id === post2.id)

                                    expect(foundPost2.author.username).to.equal('PereHDZ')
                                    expect(foundPost2.author.id).to.equal(user.id)
                                    expect(foundPost2.image).to.equal(post2.image)
                                    expect(foundPost2.comment).to.equal(post2.comment)
                                    expect(foundPost2.date).to.deep.equal(post2.date)

                                    const foundPost3 = posts.find(post => post.id === post3.id)

                                    expect(foundPost3.author.username).to.equal('')
                                    expect(foundPost3.author.id).to.equal(user.id)
                                    expect(foundPost3.image).to.equal(post3.image)
                                    expect(foundPost3.comment).to.equal(post3.comment)
                                    expect(foundPost3.date).to.deep.equal(post3.date)
                                })
                        )
                )
    )/*

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
    })*/

    after(mongoose.disconnect)
})