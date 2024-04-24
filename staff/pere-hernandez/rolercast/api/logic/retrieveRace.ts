import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { RaceType, Race, UserType, User } from '../data/index.ts'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveRace(userId: string, raceId: string): Promise<{ name: string, description: string }>{
    //validation
    validate.text(userId, 'userId', true)
    validate.text(raceId, 'raceId', true)

    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Race.findById(raceId).select('_id name description').lean()
        })
        .then(race => {
            if (!race) throw new NotFoundError('race not found')

            return { name: race.name, description: race.description }
        })
}

export default retrieveRace