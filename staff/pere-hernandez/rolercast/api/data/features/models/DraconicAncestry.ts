import mongoose from 'mongoose'

import { DraconicAncestryType } from '../types'
import { draconicAncestry } from '../schemas'

const { model } = mongoose

const DraconicAncestry = model<DraconicAncestryType>('DraconicAncestry', draconicAncestry)

export default DraconicAncestry