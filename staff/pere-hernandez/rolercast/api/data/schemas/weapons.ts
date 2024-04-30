import mongoose from 'mongoose'

const { Schema } = mongoose

const weapons = new Schema ({
    daggers: {
        type: Number,
        required: false,
        unique: true
    },
    sickles: {
        type: Number,
        required: false,
        unique: true
    },
    handAxes: {
        type: Number,
        required: false,
        unique: true
    },
    clubs: {
        type: Number,
        required: false,
        unique: true
    },
    greatClubs: {
        type: Number,
        required: false,
        unique: true
    },
    maces: {
        type: Number,
        required: false,
        unique: true
    },
    lightHammers: {
        type: Number,
        required: false,
        unique: true
    },
    quarterstaves: {
        type: Number,
        required: false,
        unique: true
    },
    spears: {
        type: Number,
        required: false,
        unique: true
    },
    javelins: {
        type: Number,
        required: false,
        unique: true
    },
    scimitars: {
        type: Number,
        required: false,
        unique: true
    },
    shortSwords: {
        type: Number,
        required: false,
        unique: true
    },
    longSwords: {
        type: Number,
        required: false,
        unique: true
    },
    flails: {
        type: Number,
        required: false,
        unique: true
    },
    morningstars: {
        type: Number,
        required: false,
        unique: true
    },
    rapiers: {
        type: Number,
        required: false,
        unique: true
    },
    warPicks: {
        type: Number,
        required: false,
        unique: true
    },
    battleAxes: {
        type: Number,
        required: false,
        unique: true
    },
    warHammers: {
        type: Number,
        required: false,
        unique: true
    },
    glaives: {
        type: Number,
        required: false,
        unique: true
    },
    greatAxes: {
        type: Number,
        required: false,
        unique: true
    },
    greatSwords: {
        type: Number,
        required: false,
        unique: true
    },
    halberds: {
        type: Number,
        required: false,
        unique: true
    },
    mauls: {
        type: Number,
        required: false,
        unique: true
    },
    pikes: {
        type: Number,
        required: false,
        unique: true
    },
    lightCrossbows: {
        type: Number,
        required: false,
        unique: true
    },
    shortBows: {
        type: Number,
        required: false,
        unique: true
    },
    tridents: {
        type: Number,
        required: false,
        unique: true
    },
    handCrossbows: {
        type: Number,
        required: false,
        unique: true
    },
    heavyCrossbows: {
        type: Number,
        required: false,
        unique: true
    },
    longbows: {
        type: Number,
        required: false,
        unique: true
    }
})

export default weapons