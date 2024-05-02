import { ObjectId } from 'mongoose'
import SavingThrowProficienciesType from './SavingThrowProficienciesType'
import ProficienciesType from './ProficienciesType'

type CharacterClassType = {
    name: string,
    description: string,
    hp?: number,
    hpPerLevel?: number,
    keyAbilities?: [string],
    savingThrowProficiencies?: SavingThrowProficienciesType,
    proficiencies?: ProficienciesType,
    parent?: ObjectId
}

export default CharacterClassType