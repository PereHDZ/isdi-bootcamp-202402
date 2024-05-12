import { validate, errors } from 'com'
import { User, Race, CharacterClass, Character } from '../data/models/index.ts'
import { NotFoundError } from 'com/errors.ts'

const { SystemError } = errors

function createCharacter(userId: string, name: string, raceId: string, characterClassId: string, hp: number, stats: Object, proficiencies: Object, expertises?: Object, cantrips?: [string], spells?: [string], actions?: [string], instrument?: string, deityId?: string, fightingStyleId?: string, archetypeId?: string, naturalExplorerId?: string): Promise<void> {
    //validation
    validate.text(userId, 'userId', true)
    validate.text(name, 'name', false)
    validate.text(raceId, 'raceId', true)
    validate.text(characterClassId, 'characterClassId', true)
    validate.number(hp, 'hp')
    //more validations pending


    //logic
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            Race.findById(raceId)
                .catch(error => { throw new SystemError(error.message) })
                .then(race => {
                    if (!race) 
                        throw new NotFoundError('race not found')

                    CharacterClass.findById(characterClassId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(characterClass => {
                            if (!characterClass)
                                throw new NotFoundError('class not found')

                            //more to do

                            return Character.create({ author: user._id, name, race: race._id, class: characterClass._id, hp, stats, proficiencies, expertises, cantrips, spells, actions, instrument, deity: deityId, fightingStyle: fightingStyleId, archetype: archetypeId, naturalExplorer: naturalExplorerId })
                                .catch(error => { throw new SystemError(error.message)})
                        })
                })
                .then(character => { })
        })
}

export default createCharacter