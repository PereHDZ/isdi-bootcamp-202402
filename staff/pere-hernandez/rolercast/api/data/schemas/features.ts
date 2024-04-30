import mongoose from 'mongoose'

import { acidBreath, additionalSpell, astralKnowledge, brave, darkvision, draconicAncestry, drowMagic, duergarMagic, dwarvenResilience, dwarvenToughness, feyAncestry, fireBreath, fleetOfFoot, frostBreath, githyankiPsionics, gnomeCunning, halflingLuck, hellishResistance, highElfCantrip, humanVersatility, lightningBreath, poisonBreath, relentlessEndurance, savageAttacks, stoneCamuflage, strongheartResilience, superiorDarkvision, tieflingMagic } from '../features/schemas/index.ts'
import cantrip from './cantrip.ts'

const { Schema } = mongoose

const features = new Schema ({
    humanVersatility: {
        type: humanVersatility,
        required: false
    },
    feyAncestry: {
        type: feyAncestry,
        required: false
    },
    darkvision: {
        type: darkvision,
        required: false
    },
    superiorDarkvision: {
        type: superiorDarkvision,
        required: false
    },
    highElfCantrip: {
        type: highElfCantrip,
        required: false
    },
    cantrip: {
        type: cantrip,
        required: false
    },
    fleetOfFoot: {
        type: fleetOfFoot,
        required: false
    },
    drowMagic: {
        type: drowMagic,
        required: false
    },
    duergarMagic: {
        type: duergarMagic,
        required: false
    },
    savageAttacks: {
        type: savageAttacks,
        required: false
    },
    halflingLuck: {
        type: halflingLuck,
        required: false
    },
    brave: {
        type: brave,
        required: false
    },
    strongheartResilience: {
        type: strongheartResilience,
        required: false
    },
    dwarvenResilience: {
        type: dwarvenResilience,
        required: false
    },
    duergarResilience: {
        type: duergarMagic,
        required: false
    },
    dwarvenToughness: {
        type: dwarvenToughness,
        required: false
    },
    gnomeCunning: {
        type: gnomeCunning,
        required: false
    },
    additionalSpell: {
        type: additionalSpell,
        required: false
    },
    stoneCamuflage: {
        type: stoneCamuflage,
        required: false
    },
    hellishResistance: {
        type: hellishResistance,
        required: false
    },
    tieflingMagic: {
        type: tieflingMagic,
        required: false
    },
    astralKnowledge: {
        type: astralKnowledge,
        required: false
    },
    githyankiPsionics: {
        type: githyankiPsionics,
        required: false
    },
    draconicAncestry: {
        type: draconicAncestry,
        required: false
    },
    acidBreath: {
        type: acidBreath,
        required: false
    },
    lightningBreath: {
        type: lightningBreath,
        required: false
    },
    fireBreath: {
        type: fireBreath,
        required: false
    },
    poisonBreath: {
        type: poisonBreath,
        required: false
    },
    frostBreath: {
        type: frostBreath,
        required: false
    },
    relentlessEndurance: {
        type: relentlessEndurance,
        required: false
    }
})

export default features