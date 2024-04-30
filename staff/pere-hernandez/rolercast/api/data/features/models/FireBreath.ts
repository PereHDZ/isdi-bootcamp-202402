import mongoose from 'mongoose'

import { FireBreathType } from '../types'
import { fireBreath } from '../schemas'

const { model } = mongoose

const FireBreath = model<FireBreathType>('FireBreath', fireBreath)

export default FireBreath