import { validate, errors } from "com"
import { ObjectId } from "mongodb"

const { SystemError, NotFoundError, StatusError } = errors

function logoutUser(userId: string, callback: Function) {
    //validation
    validate.text(userId, 'userId', true)
    validate.callback(callback)

    //logic
    this.users.findOne({_id: new ObjectId(userId)})
        .then(user => {
            if (!user){
                callback(new NotFoundError('user not found'))

                return
            }

            if (user.status === 'offline'){
                callback(new StatusError('user is already offline'))

                return
            }

            this.users.updateOne( { _id: user._id }, { $set: { status: 'offline' } })
                .then(() => callback(null, user._id.toString()))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default logoutUser