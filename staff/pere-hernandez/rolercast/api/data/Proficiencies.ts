import mongoose from 'mongoose'

import { WeaponsType, ArmourType, SkillsType, Weapons, Armour, Skills } from './index'

const { Schema, model } = mongoose

type ProficienciesType = {
    weapons?: WeaponsType,
    armour?: ArmourType,
    skills?: SkillsType
}

const proficiencies = new Schema ({
    weapons: {
        type: Weapons,
        required: true,
    },
    armour: {
        type: Armour,
        required: true
    },
    skills: {
        type: Skills,
        required: true
    }
})

const Proficiencies = model<ProficienciesType>('Proficiencies', proficiencies)

export { ProficienciesType, Proficiencies}