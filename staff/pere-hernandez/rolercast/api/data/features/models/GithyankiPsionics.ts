import mongoose from 'mongoose'

import { GithyankiPsionicsType } from '../types'
import { githyankiPsionics } from '../schemas'

const { model } = mongoose

const GithyankiPsionics = model<GithyankiPsionicsType>('GithyankiPsionics', githyankiPsionics)

export default GithyankiPsionics