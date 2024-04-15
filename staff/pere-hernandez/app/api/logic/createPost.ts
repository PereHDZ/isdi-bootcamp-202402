import { validate, errors } from "com"
import { ObjectId } from "mongodb"

const { SystemError, NotFoundError} = errors

function createPost(userId: string, image: string, comment: string, callback: Function){
    //validation
    validate.text(userId, 'userId', true)
    validate.url(image, 'image')
    if(comment) validate.text(comment, 'comment')
    validate.callback(callback)

    //logic
    this.users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }
            this.posts.insertOne({ author: user._id, image, comment, date: new Date })
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default createPost