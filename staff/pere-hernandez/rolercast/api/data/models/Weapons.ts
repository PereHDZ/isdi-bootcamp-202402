import mongoose from 'mongoose'

import { WeaponsType } from '../types'
import { weapons } from '../schemas/index.ts'

const { model } = mongoose

const Weapons = model<WeaponsType>('Weapons', weapons)

export default Weapons