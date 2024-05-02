import { ObjectId } from 'mongoose'

type CharacterClassType = {
    name: string,
    description: string,
    hp?: number,
    hpPerLevel?: number,
    keyAbilities?: [string],
    parent?: ObjectId
}

export default CharacterClassType