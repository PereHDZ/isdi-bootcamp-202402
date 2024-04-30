import mongoose from 'mongoose'

const { Schema } = mongoose

const weapons = new Schema ({
    daggers: {
        type: Number,
        required: false
    },
    sickles: {
        type: Number,
        required: false
    },
    handAxes: {
        type: Number,
        required: false
    },
    clubs: {
        type: Number,
        required: false
    },
    greatClubs: {
        type: Number,
        required: false
    },
    maces: {
        type: Number,
        required: false
    },
    lightHammers: {
        type: Number,
        required: false
    },
    quarterstaves: {
        type: Number,
        required: false
    },
    spears: {
        type: Number,
        required: false
    },
    javelins: {
        type: Number,
        required: false
    },
    scimitars: {
        type: Number,
        required: false
    },
    shortSwords: {
        type: Number,
        required: false
    },
    longSwords: {
        type: Number,
        required: false
    },
    flails: {
        type: Number,
        required: false
    },
    morningstars: {
        type: Number,
        required: false
    },
    rapiers: {
        type: Number,
        required: false
    },
    warPicks: {
        type: Number,
        required: false
    },
    battleAxes: {
        type: Number,
        required: false
    },
    warHammers: {
        type: Number,
        required: false
    },
    glaives: {
        type: Number,
        required: false
    },
    greatAxes: {
        type: Number,
        required: false
    },
    greatSwords: {
        type: Number,
        required: false
    },
    halberds: {
        type: Number,
        required: false
    },
    mauls: {
        type: Number,
        required: false
    },
    pikes: {
        type: Number,
        required: false
    },
    lightCrossbows: {
        type: Number,
        required: false
    },
    shortBows: {
        type: Number,
        required: false
    },
    tridents: {
        type: Number,
        required: false
    },
    handCrossbows: {
        type: Number,
        required: false
    },
    heavyCrossbows: {
        type: Number,
        required: false
    },
    longbows: {
        type: Number,
        required: false
    }
})

export default weapons