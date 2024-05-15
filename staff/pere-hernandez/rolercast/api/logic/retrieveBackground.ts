import { Background, User } from '../data/models/index.ts'
import { validate, errors } from 'com'
import { SkillsType } from '../data/types/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveBackground(userId: string, backgroundId: string): Promise<{ id: string, name: string, description: string, skills: SkillsType }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(backgroundId, 'backgroundId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Background.findById(backgroundId).select('_id name description skills').lean()
        })
        .then (background => {
            if (!background) throw new NotFoundError('background not found')

            return { id: background._id.toString(), name: background.name, description: background.description, skills: background.skills }
        })
}

export default retrieveBackground