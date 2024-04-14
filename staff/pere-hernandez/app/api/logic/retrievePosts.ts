import { validate, errors } from "com"
import { ObjectId } from "mongodb"

const { SystemError, NotFoundError } = errors

function retrievePosts(userId, callback){
    //validation
    validate.text(userId, 'userId', true)
    validate.callback(callback)

    //logic
    this.users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }
            this.posts.find({}).toArray()
                .then(posts => {
                    let count = 0
                    let errorDetected = false

                    posts.forEach(post => {
                        this.users.findOne({ _id: post.author })
                            .then(user => {
                                if (errorDetected) return

                                if(!user) {
                                    callback(new NotFoundError('post owner not found'))

                                    errorDetected = true

                                    return
                                }
                                post.id = post._id.toString()
                                delete post._id

                                post.author = {
                                    id: user._id.toString(),
                                    username: user.username
                                }
                                count++

                                if (count === post.length) callback(null, post.reverse())
                            })
                            .catch(error => callback(error.message))
                    })
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default retrievePosts