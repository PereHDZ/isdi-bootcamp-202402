import { ObjectId, Schema } from 'mongoose'

import { Race, User } from '../data/models/index.ts'
import { FeaturesType, ProficienciesType } from '../data/types/index.ts'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
const { Types: { ObjectId } } = Schema

function retrieveRace(userId: string, raceId: string): Promise<{ name: string, description: string, speed?: number, features?: FeaturesType, proficiencies?: ProficienciesType, parent?: ObjectId }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(raceId, 'raceId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Race.findById(raceId).select('_id name description speed features proficiencies parent').lean()
        })
        .then(race => {
            if (!race) throw new NotFoundError('race not found')

            return { name: race.name, description: race.description, speed: race.speed, features: race.features, proficiencies: race.proficiencies, parent: race.parent }
        })
}

export default retrieveRace