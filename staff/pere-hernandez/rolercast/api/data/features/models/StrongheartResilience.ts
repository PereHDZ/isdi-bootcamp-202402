import mongoose from 'mongoose'

import { StrongheartResilienceType } from '../types'
import { strongheartResilience } from '../schemas'

const { model } = mongoose

const StrongheartResilience = model<StrongheartResilienceType>('StrongheartResilience', strongheartResilience)

export default StrongheartResilience