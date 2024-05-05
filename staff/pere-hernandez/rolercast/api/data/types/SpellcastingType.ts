import { ObjectId } from 'mongoose'

type SpellcastingType = {
    cantripCount?: number,
    availableCantrips?: [ObjectId],
    spellCount?: number,
    avaliableSpells?: [ObjectId]
}

export default SpellcastingType