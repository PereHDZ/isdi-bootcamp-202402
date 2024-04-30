import mongoose from 'mongoose'

import { DuergarMagicType } from '../types'
import { duergarMagic } from '../schemas'

const { model } = mongoose

const DuergarMagic = model<DuergarMagicType>('DuergarMagic', duergarMagic)

export default DuergarMagic