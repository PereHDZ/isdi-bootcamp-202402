import mongoose from 'mongoose'

import { LightningBreathType } from '../types'
import { lightningBreath } from '../schemas'

const { model } = mongoose

const LightningBreath = model<LightningBreathType>('LightningBreath', lightningBreath)

export default LightningBreath