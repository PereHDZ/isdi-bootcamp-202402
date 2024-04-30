import mongoose from 'mongoose'

import { PoisonBreathType } from '../types'
import { poisonBreath } from '../schemas'

const { model } = mongoose

const PoisonBreath = model<PoisonBreathType>('PoisonBreath', poisonBreath)

export default PoisonBreath