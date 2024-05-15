import { validate, errors } from 'com'
import { User, Character } from '../data/models/index.ts'
import mongoose from 'mongoose'

const {  NotFoundError, SystemError, UnauthorizedError } = errors
const { Types: { ObjectId } } = mongoose

function removeCharacter(userId, characterId): Promise<void> {
    //validation
    validate.text(userId, 'userId', true)
    validate.text(characterId, 'characterId', true)

    //logic
    return User.findById(userId)
        .catch(error =>  {throw new SystemError(error.message) })
        .then(user => {
            if(!user) 
                throw new NotFoundError('user does not exist')

            return Character.findById(characterId)
                .catch(error => { throw new SystemError(error.message) })
                .then(character => {
                    if(!character)
                        throw new NotFoundError('character does not exist')

                    if(character.author.toString() !== user._id.toString())
                        throw new UnauthorizedError('character does not belong to user')

                    return Character.deleteOne({ _id: new ObjectId(characterId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(res => { })
                })
        })
}

export default removeCharacter