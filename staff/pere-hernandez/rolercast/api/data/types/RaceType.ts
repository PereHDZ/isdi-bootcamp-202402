import { ObjectId } from 'mongoose'

import { FeaturesType, ProficienciesType } from '.'

type RaceType = {
    name: string,
    description: string,
    speed?: number,
    features?: FeaturesType,
    proficiencies?: ProficienciesType,
    parent?: ObjectId
}

export default RaceType