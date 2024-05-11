import mongoose from 'mongoose'

import ActionType from '../types/ActionType.ts'
import action from '../schemas/action.ts'

const { model } = mongoose

const Action = model<ActionType>('Action', action)

export default Action