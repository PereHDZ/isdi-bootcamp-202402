import mongoose from 'mongoose'

import { FrostBreathType } from '../types'
import { frostBreath } from '../schemas'

const { model } = mongoose

const FrostBreath = model<FrostBreathType>('FrostBreath', frostBreath)

export default FrostBreath