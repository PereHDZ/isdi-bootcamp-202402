import { validate, errors } from "com"
import { User, Post } from '../data/index.ts'

const { SystemError, NotFoundError} = errors

function createPost(userId: string, image: string, comment: string): Promise<void>{
    //validation
    validate.text(userId, 'userId', true)
    validate.url(image, 'image')
    if(comment) validate.text(comment, 'comment')

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({ author: user._id, image, comment, date: new Date })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => { })
}

export default createPost