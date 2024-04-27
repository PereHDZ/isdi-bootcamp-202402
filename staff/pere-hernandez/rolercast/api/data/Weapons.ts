import mongoose from 'mongoose'

const { Schema, model } = mongoose

type WeaponsType = {
    daggers?: number,
    sickles?: number,
    handAxes?: number,
    clubs?: number,
    greatClubs?: number,
    maces?: number,
    lightHammers?: number,
    quarterstaves?: number,
    spears?: number,
    javelins?: number,
    scimitars?: number,
    shortSwords?: number,
    longSwords?: number,
    flails?: number,
    morningstars?: number,
    rapiers?: number,
    warPicks?: number,
    battleAxes?: number,
    warHammers?: number,
    glaives?: number,
    greatAxes?: number,
    greatSwords?: number,
    halberds?: number,
    mauls?: number,
    pikes?: number,
    lightCrossbows?: number,
    shortBows?: number,
    tridents?: number,
    handCrossbows?: number,
    heavyCrossbows?: number,
    longbows?: number    
}

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

const Weapons = model<WeaponsType>('Weapons', weapons)

export { WeaponsType, Weapons}