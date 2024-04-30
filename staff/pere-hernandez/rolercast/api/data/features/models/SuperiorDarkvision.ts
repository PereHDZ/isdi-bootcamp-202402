import mongoose from 'mongoose'

import { SuperiorDarkvisionType } from '../types'
import { superiorDarkvision } from '../schemas'

const { model } = mongoose

const SuperiorDarkvision = model<SuperiorDarkvisionType>('SuperiorDarkvision', superiorDarkvision)

export default SuperiorDarkvision