import mongoose from 'mongoose'

import { BackgroundType } from '../types'
import { background } from '../schemas/index.ts'

const { model } = mongoose

const Background = model<BackgroundType>('Background', background)

export default Background