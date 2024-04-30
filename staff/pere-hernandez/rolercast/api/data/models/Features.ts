import mongoose from 'mongoose'

import { FeaturesType } from '../types'
import { features } from '../schemas/index'

const { model } = mongoose

const Features = model<FeaturesType>('Features', features)

export default Features