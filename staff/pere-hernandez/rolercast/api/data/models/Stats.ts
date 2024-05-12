import mongoose from 'mongoose'

import { StatsType } from '../types'
import { stats } from '../schemas/index.ts'

const { model } = mongoose

const Stats = model<StatsType>('Stats', stats)

export default Stats