import mongoose from 'mongoose'

import { DuergarResilienceType } from '../types'
import { duergarResilience } from '../schemas'

const { model } = mongoose

const DuergarResilience = model<DuergarResilienceType>('DuergarResilience', duergarResilience)

export default DuergarResilience