import mongoose from 'mongoose'

import { FeyAncestryType } from '../types'
import { feyAncestry } from '../schemas'

const { model } = mongoose

const FeyAncestry = model<FeyAncestryType>('FeyAncestry', feyAncestry)

export default FeyAncestry