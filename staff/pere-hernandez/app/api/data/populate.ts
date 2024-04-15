import mongoose from "mongoose"

import { User, Post } from '.'

mongoose.connect('mongodb://localhost:27017/isdigram')
    .then(() => User.deleteMany())
    .then(() => Post.deleteMany())
    .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992' }))
    .then(user1 => {
        let count = 1

        const post1 = { author: user1._id, image: 'https://media.giphy.com/media/HjdxuAuySm809plhQK/giphy.gif?cid=790b7611e2g3g0ck799khuzkz8szbljvgul2nf3u08xx8noq&ep=v1_gifs_search&rid=giphy.gif&ct=g', comment: 'One', date: new Date }

        return Post.create(post1)
            .then(() => {
                count++

                const post2 = { author: user1._id, image: 'https://media.giphy.com/media/H1Xz1rQn38lOWheGH8/giphy.gif?cid=ecf05e4734y4f2kzk67yjb6fsdwalsz4tv3oeijeao3q2zs6&ep=v1_gifs_search&rid=giphy.gif&ct=g', comment: 'Two', date: new Date }

                return Post.create(post2)
            })
            .then(() => {
                count++

                const post3 = { author: user1._id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXN1cG1nbGNpeGZiYnIweDN2aGRjNzAwcmNiOWswM3ZzcGI0enp6MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrLxAJqT8EftF2VU6/giphy.gif', comment: 'Three', date: new Date }

                return Post.create(post3)
            })
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)