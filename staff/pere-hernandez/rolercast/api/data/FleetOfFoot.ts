import mongoose from 'mongoose'

const { Schema, model } = mongoose

type FleetOfFootType = {
    name: string,
    bonusesDescription: [string]
}

const fleetOfFoot = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const FleetOfFoot = model<FleetOfFootType>('fleetOfFoot', fleetOfFoot)

export { FleetOfFootType, FleetOfFoot }