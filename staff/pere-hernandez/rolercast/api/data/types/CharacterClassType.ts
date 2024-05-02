import { ObjectId } from 'mongoose'
import SavingThrowProficienciesType from './SavingThrowProficienciesType'

type CharacterClassType = {
    name: string,
    description: string,
    hp?: number,
    hpPerLevel?: number,
    keyAbilities?: [string],
    savingThrowProficiencies?: SavingThrowProficienciesType
    parent?: ObjectId
}

export default CharacterClassType