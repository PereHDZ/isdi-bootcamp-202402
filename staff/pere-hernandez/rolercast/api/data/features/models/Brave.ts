import mongoose from 'mongoose'

import { BraveType } from '../types'
import { brave } from '../schemas'

const { model } = mongoose

const Brave = model<BraveType>('Brave', brave)

export default Brave