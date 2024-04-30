import mongoose from 'mongoose'

import { DwarvenToughnessType } from '../types'
import { dwarvenToughness } from '../schemas'

const { model } = mongoose

const DwarvenToughness = model<DwarvenToughnessType>('DwarvenToughness', dwarvenToughness)

export default DwarvenToughness