import mongoose from 'mongoose'

import { HalflingLuckType } from '../types'
import { halflingLuck } from '../schemas'

const { model } = mongoose

const HalflingLuck = model<HalflingLuckType>('HalflingLuck', halflingLuck)

export default HalflingLuck