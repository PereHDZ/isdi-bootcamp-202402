import mongoose from 'mongoose'

import { SpellcastingType } from '../types'
import { spellcasting } from '../schemas/index.ts'

const { model } = mongoose

const Spellcasting = model<SpellcastingType>('Spellcasting', spellcasting)

export default Spellcasting