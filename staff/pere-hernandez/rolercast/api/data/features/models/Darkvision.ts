import mongoose from 'mongoose'

import { DarkvisionType } from '../types'
import { darkvision } from '../schemas'

const { model } = mongoose

const Darkvision = model<DarkvisionType>('Darkvision', darkvision)

export default Darkvision