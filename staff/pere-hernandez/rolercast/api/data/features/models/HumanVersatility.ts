import mongoose from 'mongoose'

import { HumanVersatilityType } from '../types'
import { humanVersatility } from '../schemas'

const { model } = mongoose

const HumanVersatility = model<HumanVersatilityType>('HumanVersatility', humanVersatility)

export default HumanVersatility