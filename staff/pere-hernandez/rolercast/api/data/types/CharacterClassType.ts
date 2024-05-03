import { ObjectId } from 'mongoose'
import SavingThrowProficienciesType from './SavingThrowProficienciesType'
import ProficienciesType from './ProficienciesType'
import SpellcastingType from './SpellcastingType'

type CharacterClassType = {
    name: string,
    description: string,
    hp?: number,
    hpPerLevel?: number,
    keyAbilities?: [string],
    savingThrowProficiencies?: SavingThrowProficienciesType,
    proficiencies?: ProficienciesType,
    spellcastingAbility?: string,
    spellcasting?: SpellcastingType,
    parent?: ObjectId
}

export default CharacterClassType