import mongoose from 'mongoose'

import { StoneCamuflageType } from '../types'
import { stoneCamuflage } from '../schemas'

const { model } = mongoose

const StoneCamuflage = model<StoneCamuflageType>('StoneCamuflage', stoneCamuflage)

export default StoneCamuflage