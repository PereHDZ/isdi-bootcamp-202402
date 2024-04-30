import mongoose from 'mongoose'

import { GnomeCunningType } from '../types'
import { gnomeCunning } from '../schemas'

const { model } = mongoose

const GnomeCunning = model<GnomeCunningType>('GnomeCunning', gnomeCunning)

export default GnomeCunning