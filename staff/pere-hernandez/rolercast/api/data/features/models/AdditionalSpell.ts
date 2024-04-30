import mongoose from 'mongoose'

import { AdditionalSpellType } from '../types'
import { additionalSpell } from '../schemas'

const { model } = mongoose

const AdditionalSpell = model<AdditionalSpellType>('AdditionalSpell', additionalSpell)

export default AdditionalSpell