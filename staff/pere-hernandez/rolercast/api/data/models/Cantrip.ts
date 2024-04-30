import mongoose from 'mongoose'

import CantripType from '../types/CantripType'
import cantrip from '../schemas/cantrip.ts'

const { model } = mongoose

const Cantrip = model<CantripType>('Cantrip', cantrip)

export default Cantrip