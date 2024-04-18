import mongoose from "mongoose"
import logic from "./index.ts"
import { expect, use } from "chai"
import { errors } from "com"
import chaiAsPromised from "chai-as-promised"

use(chaiAsPromised)

const { Types: { ObjectId } } = mongoose

import { User, Post } from "../data/index.ts"
import { NotFoundError } from "com/errors.ts"

const { } = errors

describe('createPost', () => {
    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    it('creates post with image and comment from existing user', () => 
        User.deleteMany()
            .then(() => Post.deleteMany()
                .then(() => 
                    User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992'})
                        .then(user => {
                            logic.createPost(user.id, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzhnZ3B4NDNvb3N0dXA4eDZoOTE1bzNoMzRiOWJ5d2o3bHhwa2p4MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KcW0iKgbONHUxzWrIF/giphy.gif', 'Mi compi de piso')
                                .then(() => 
                                    Post.findOne({})
                                        .then(post => {
                                            expect(post.author.toString()).to.equal(user.id)
                                            expect(post.image).to.equal('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzhnZ3B4NDNvb3N0dXA4eDZoOTE1bzNoMzRiOWJ5d2o3bHhwa2p4MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KcW0iKgbONHUxzWrIF/giphy.gif')
                                            expect(post.comment).to.equal('Mi compi de piso')
                                            expect(post.date).to.be.instanceOf(Date)
                                        })
                                )
                        })
                )
            )
    )

    it('fails on userId from unexisting user', () => 
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                        .then(user => 
                            expect(logic.createPost(new ObjectId().toString(), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', 'Mi compi de piso')).to.be.rejectedWith(NotFoundError, 'user not found')
                        )
                    )
            })
    )

    it('fails on non-string userId', () => 
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                        .then(user => 
                            //@ts-ignore
                            expect(logic.createPost(new ObjectId(), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', 'Mi compi de piso')).to.be.rejectedWith(NotFoundError, 'user not found')
                        )
                    )
            })
    )

    it ('fails on non valid url for image', () => 
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                        .then(user => {
                            const image = 'I am not a valid URL'
                            
                            //@ts-ignore
                            expect(logic.createPost(user.id, image, 'Mi compi de piso')).to.be.rejectedWith(TypeError, 'image I am not a valid URL is not an url')
                        })
                    )
            })
    )

    it ('fails on non-string comment', () => 
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => User.create({ username:'PereHDZ', email:'perehdz@hotmail.com', password:'cuquis1992' })
                        .then(user => {
                            const comment = 26
                            
                            //@ts-ignore
                            expect(logic.createPost(user.id, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZydjhjd3Z6bmRxc2IzMm9md3pjZm56eDBhbXcyZWtuMGN1M3JiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EmSCxtcjQCmXK/giphy.gif)', comment)).to.be.rejectedWith(TypeError, 'comment 26 is not a string')
                        })
                    )
            })
    )
    after(() => mongoose.disconnect())
})