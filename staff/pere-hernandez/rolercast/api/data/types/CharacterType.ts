import { ObjectId } from 'mongoose'
import StatsType from './StatsType'
import ProficienciesType from './ProficienciesType'
import SkillsType from './SkillsType'

type CharacterType = {
    author: ObjectId,
    name: string,
    race: ObjectId,
    class: ObjectId,
    background: ObjectId,
    hp: number,
    stats: StatsType,
    proficiencies: ProficienciesType,
    expertises?: SkillsType,
    cantrips?: [ObjectId],
    spells?: [ObjectId],
    actions?: [ObjectId],
    instrument?: string,
    deity?: ObjectId,
    fightingStyle?: ObjectId,
    acrhetype?: ObjectId,
    naturalExplorer?: ObjectId,
}

export default CharacterType