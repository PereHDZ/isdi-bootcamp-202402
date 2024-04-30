import mongoose from 'mongoose'

import { FleetOfFootType } from '../types'
import { fleetOfFoot } from '../schemas'

const { model } = mongoose

const FleetOfFoot = model<FleetOfFootType>('fleetOfFoot', fleetOfFoot)

export default FleetOfFoot