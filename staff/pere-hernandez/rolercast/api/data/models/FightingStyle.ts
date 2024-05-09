import mongoose from 'mongoose'

import FightingStyleType from '../types/FightingStyleType'
import fightingStyle from '../schemas/fightingStyle.ts'

const { model } = mongoose

const FightingStyle = model<FightingStyleType>('FightingStyle', fightingStyle)

export default FightingStyle