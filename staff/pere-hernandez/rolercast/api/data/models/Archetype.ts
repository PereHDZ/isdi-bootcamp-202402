import mongoose from 'mongoose'

import { ArchetypeType } from '../types'
import { archetype } from '../schemas/index.ts'

const { model } = mongoose

const Archetype = model<ArchetypeType>('Archetype', archetype)

export default Archetype