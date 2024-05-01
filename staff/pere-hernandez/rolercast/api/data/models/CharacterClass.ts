import mongoose from 'mongoose'

import { CharacterClassType } from '../types'
import { characterClass } from '../schemas/index.ts'

const { model } = mongoose

const CharacterClass = model<CharacterClassType>('CharacterClass', characterClass)

export default CharacterClass