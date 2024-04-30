import mongoose from 'mongoose'

import { NaturallyStealthyType } from '../types'
import { naturallyStealthy } from '../schemas'

const { model } = mongoose

const NaturallyStealthy = model<NaturallyStealthyType>('NaturallyStealthy', naturallyStealthy)

export default NaturallyStealthy