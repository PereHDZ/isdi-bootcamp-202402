import mongoose from 'mongoose'

import { SavingThrowProficienciesType } from '../types'
import { savingThrowProficiencies } from '../schemas/index.ts'

const { model } = mongoose

const SavingThrowProficiencies = model<SavingThrowProficienciesType>('SavingThrowProficiencies', savingThrowProficiencies)

export default SavingThrowProficiencies