import { ObjectId } from 'mongoose'
import ProficienciesType from './ProficienciesType'

type NaturalExplorerType = {
    name: string,
    description: string,
    proficiencies?: ProficienciesType,
    knownSpell?: ObjectId
}

export default NaturalExplorerType