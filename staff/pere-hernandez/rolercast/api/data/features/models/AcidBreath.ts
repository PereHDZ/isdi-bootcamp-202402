import mongoose from 'mongoose'

import { AcidBreathType } from '../types'
import { acidBreath } from '../schemas'

const { model } = mongoose

const AcidBreath = model<AcidBreathType>('AcidBreath', acidBreath)

export default AcidBreath