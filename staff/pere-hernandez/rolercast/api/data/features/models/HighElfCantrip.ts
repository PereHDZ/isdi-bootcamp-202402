import mongoose from 'mongoose'

import { HighElfCantripType } from '../types'
import { highElfCantrip } from '../schemas'

const { model } = mongoose

const HighElfCantrip = model<HighElfCantripType>('HighElfCantrip', highElfCantrip)

export default HighElfCantrip