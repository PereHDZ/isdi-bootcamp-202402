import mongoose from 'mongoose'

import { CharacterType } from '../types'
import { character } from '../schemas/index.ts'

const { model } = mongoose

const Character = model<CharacterType>('Character', character)

export default Character