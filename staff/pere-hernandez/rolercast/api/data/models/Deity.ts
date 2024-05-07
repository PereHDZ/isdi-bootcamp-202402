import mongoose from 'mongoose'

import DeityType from '../types/DeityType'
import deity from '../schemas/deity.ts'

const { model } = mongoose

const Deity = model<DeityType>('Deity', deity)

export default Deity