import mongoose from 'mongoose'

import { DrowMagicType } from '../types'
import { drowMagic } from '../schemas'

const { model } = mongoose

const DrowMagic = model<DrowMagicType>('DrowMagic', drowMagic)

export default DrowMagic