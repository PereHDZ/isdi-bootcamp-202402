import mongoose from 'mongoose'

import { HellishResistanceType } from '../types'
import { hellishResistance } from '../schemas'

const { model } = mongoose

const HellishResistance = model<HellishResistanceType>('HellishResistance', hellishResistance)

export default HellishResistance