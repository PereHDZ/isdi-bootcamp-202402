import mongoose from 'mongoose'

import { RelentlessEnduranceType } from '../types'
import { relentlessEndurance } from '../schemas'

const { model } = mongoose

const RelentlessEndurance = model<RelentlessEnduranceType>('RelentlessEndurance', relentlessEndurance)

export default RelentlessEndurance