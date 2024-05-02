import { ObjectId } from 'mongoose'

type CharacterClassType = {
    name: string,
    description: string,
    hp?: number,
    hpPerLevel?: number,
    parent?: ObjectId
}

export default CharacterClassType