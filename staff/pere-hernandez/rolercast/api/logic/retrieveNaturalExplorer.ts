import { ObjectId, Schema } from 'mongoose'

import { NaturalExplorer, User } from '../data/models/index.ts'
import { ProficienciesType } from '../data/types/index.ts'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
const { Types: { ObjectId } } = Schema

function retrieveNaturalExplorer(userId: string, naturalExplorerId: string): Promise<{ id: string, name: string, description: string, proficiencies?: ProficienciesType, knownCantrip?: ObjectId, knownSpell?: ObjectId }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(naturalExplorerId, 'naturalExplorerId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return NaturalExplorer.findById(naturalExplorerId).select('id name description proficiencies knownCantrip knownSpell ').lean()
        })
        .then(naturalExplorer => {
            if (!naturalExplorer) throw new NotFoundError('naturalExplorer not found')

            return { id: naturalExplorer._id.toString(), name: naturalExplorer.name, description: naturalExplorer.description, proficiencies: naturalExplorer.proficiencies, knownSpell: naturalExplorer.knownSpell }
        })
}

export default retrieveNaturalExplorer