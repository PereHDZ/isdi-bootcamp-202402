import mongoose from 'mongoose'

const { Schema } = mongoose

const armour = new Schema ({
    lightArmour: {
        type: Number,
        required: false
    },
    mediumArmour: {
        type: Number,
        required: false
    },
    heavyArmour: {
        type: Number,
        required: false
    },
    shields: {
        type: Number,
        required: false
    }
})

export default armour