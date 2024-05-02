import mongoose from 'mongoose'

import SpellType from '../types/SpellType'
import spell from '../schemas/spell.ts'

const { model } = mongoose

const Spell = model<SpellType>('Spell', spell)

export default Spell