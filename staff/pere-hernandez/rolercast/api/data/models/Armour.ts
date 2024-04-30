import mongoose from 'mongoose'

import { ArmourType } from '../types'
import { armour } from '../schemas/index.ts'

const { model } = mongoose

const Armour = model<ArmourType>('Armour', armour)

export default Armour