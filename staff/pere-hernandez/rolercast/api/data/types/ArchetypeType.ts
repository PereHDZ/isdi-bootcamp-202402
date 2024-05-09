import { ObjectId } from 'mongoose'
import ProficienciesType from './ProficienciesType'

type ArchetypeType = {
    name: string,
    description: string,
    proficiencies?: ProficienciesType,
    knownCantrip?: ObjectId,
    knownSpell?: ObjectId
}

export default ArchetypeType