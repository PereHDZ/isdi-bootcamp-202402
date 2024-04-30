import mongoose from 'mongoose'

import { TieflingMagicType } from '../types'
import { tieflingMagic } from '../schemas'

const { model } = mongoose

const TieflingMagic = model<TieflingMagicType>('TieflingMagic', tieflingMagic)

export default TieflingMagic