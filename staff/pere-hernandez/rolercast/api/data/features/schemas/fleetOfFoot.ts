import mongoose from 'mongoose'

const { Schema } = mongoose

const fleetOfFoot = new Schema ({
    name: {
        type: String,
        required: true
    },
    bonusesDescription: {
        type: String,
        required: true
    }
})

export default fleetOfFoot