import { validate, errors } from 'com'
import { User, Race, CharacterClass, Background, Character } from '../data/models/index.ts'
import { NotFoundError } from 'com/errors.ts'

const { SystemError } = errors

async function createCharacter(userId: string, name: string, raceId: string, characterClassId: string, backgroundId: string, hp: number, stats: Object, proficiencies: Object, expertises?: Object, cantrips?: [string], spells?: [string], actions?: [string], instrument?: string, deityId?: string, fightingStyleId?: string, archetypeId?: string, naturalExplorerId?: string): Promise<void> {
    // validation
    validate.text(userId, 'userId', true)
    validate.text(name, 'name', false)
    validate.text(raceId, 'raceId', true)
    validate.text(characterClassId, 'characterClassId', true)
    validate.text(backgroundId, 'backgroundId', true)
    validate.number(hp, 'hp')
    // more validations pending

    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new NotFoundError('User not found')
        }

        const race = await Race.findById(raceId)
        if (!race) {
            throw new NotFoundError('Race not found')
        }

        const characterClass = await CharacterClass.findById(characterClassId)
        if (!characterClass) {
            throw new NotFoundError('Character class not found')
        }

        const background = await Background.findById(backgroundId)
        if(!background){
            throw new NotFoundError('Background not found')
        }

        await Character.create({ author: user._id, name, race: race._id, characterClass: characterClass._id, background: background._id, hp, stats, proficiencies, expertises, cantrips, spells, actions, instrument, deity: deityId, fightingStyle: fightingStyleId, archetype: archetypeId, naturalExplorer: naturalExplorerId })
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default createCharacter