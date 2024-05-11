import { ObjectId } from 'mongoose'
import SavingThrowProficienciesType from './SavingThrowProficienciesType'
import ProficienciesType from './ProficienciesType'
import SpellcastingType from './SpellcastingType'
import SkillsType from './SkillsType'

type CharacterClassType = {
    name: string,
    description: string,
    hp?: number,
    hpPerLevel?: number,
    keyAbilities?: [string],
    savingThrowProficiencies?: SavingThrowProficienciesType,
    proficiencies?: ProficienciesType,
    skillCount?: number,
    expertises?: SkillsType,
    spellcastingAbility?: string,
    spellcasting?: SpellcastingType,
    knownSpells?: [ObjectId],
    knownCantrips?: [ObjectId],
    classActions?: [ObjectId],
    parent?: ObjectId
}

export default CharacterClassType