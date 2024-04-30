import mongoose from 'mongoose'

import { WeaponsType } from '../types'
import { weapons } from '../schemas/index'

const { model } = mongoose

const Weapons = model<WeaponsType>('Weapons', weapons)

export default Weapons