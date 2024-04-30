import mongoose from 'mongoose'

import { RaceType } from '../types'
import { race } from '../schemas/index.ts'

const { model } = mongoose

const Race = model<RaceType>('Race', race)

export default Race