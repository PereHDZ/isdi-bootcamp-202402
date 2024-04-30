import mongoose from 'mongoose'

import { SavageAttacksType } from '../types'
import { savageAttacks } from '../schemas'

const { model } = mongoose

const SavageAttacks = model<SavageAttacksType>('SavageAttacks', savageAttacks)

export default SavageAttacks