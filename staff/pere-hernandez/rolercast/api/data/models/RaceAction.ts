import mongoose from 'mongoose'

import RaceActionType from '../types/RaceActionType'
import raceAction from '../schemas/raceAction.ts'

const { model } = mongoose

const RaceAction = model<RaceActionType>('RaceAction', raceAction)

export default RaceAction