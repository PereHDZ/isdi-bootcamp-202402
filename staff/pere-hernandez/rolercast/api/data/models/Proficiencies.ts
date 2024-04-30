import mongoose from 'mongoose'

import { ProficienciesType } from '../types'
import { proficiencies } from '../schemas/index.ts'

const { model } = mongoose

const Proficiencies = model<ProficienciesType>('Proficiencies', proficiencies)

export default Proficiencies