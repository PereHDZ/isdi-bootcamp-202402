import mongoose from 'mongoose'

import { DwarvenResilienceType } from '../types'
import { dwarvenResilience } from '../schemas'

const { model } = mongoose

const DwarvenResilience = model<DwarvenResilienceType>('DwarvenResilience', dwarvenResilience)

export default DwarvenResilience