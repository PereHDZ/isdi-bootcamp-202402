import logic from '../logic'

import { useEffect, useState } from 'react'
import { useRace, useCharacterClass, useBackground, useHp, useStats, useProficiencies, useExpertises, useCantrips, useSpells, useInstrument, useDeity, useFightingstyle, useArchetype, useNaturalExplorer } from '../pages/Home'

import ReturnButton from '../components/commonComponents/ReturnButton'
import ClassAndNameInfo from '../components/confirmCharacterComponents/ClassAndNameInfo'
import Stats from '../components/confirmCharacterComponents/Stats'
import Proficiencies from '../components/confirmCharacterComponents/Proficiencies'
import Expertises from '../components/confirmCharacterComponents/Expertises'
import Spells from '../components/confirmCharacterComponents/Spells'
import Actions from '../components/confirmCharacterComponents/Actions'

function ConfirmCharacter ({ onRetrunClick, onCharacterCreated }) {
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { background } = useBackground()
    const { hp } = useHp()
    const { stats } = useStats()
    const { proficiencies } = useProficiencies()
    const { expertises } = useExpertises()
    const { cantrips } = useCantrips()
    const { spells } = useSpells()
    const { instrument } = useInstrument()
    const { deity } = useDeity()
    const { fightingStyle } = useFightingstyle()
    const { archetype } = useArchetype()
    const { naturalExplorer } = useNaturalExplorer()

    const [parentRace, setParentRace] = useState(null)
    const [parentClass, setParentClass] = useState(null)

    const [actions, setActions] = useState([])

    useEffect(() => {
        const newActions = [...actions]
        
        if (!!characterClass.parent && !!parentClass && !!parentClass.classActions){
            for (let i = 0; i < parentClass.classActions.length; i++){
                newActions.push(parentClass.classActions[i])
            }            
        }
        if (race.name.includes('Dragon')){
            newActions.push(race.features.draconicAncestry.raceAction)
        }
        if (!!characterClass.classActions){
            for (let i = 0; i < characterClass.classActions.length; i++){
                newActions.push(characterClass.classActions[i])
            }            
        }

        const filteredActions = newActions.filter((value, index) => newActions.indexOf(value) === index)

        setActions(filteredActions)
    }, [parentClass])

    const handleReturnClick = () => {
        event.preventDefault()

        onRetrunClick()
    }

    const handleSubmit = event => {
        event.preventDefault()
        
        const form = event.target

        const name = form.name.value
        let deityId = null
        let fightingStyleId = null
        let archetypeId = null
        let naturalExplorerId = null

        if (!!deity){
            deityId = deity.id
        }
        if (!!fightingStyle){
            fightingStyleId = fightingStyle.id
        }
        if (!!archetype){
            archetypeId = archetype.id
        }
        if (!!naturalExplorer){
            naturalExplorerId = naturalExplorer.id
        }

        try{
            logic.createCharacter(name, race._id, characterClass._id, background._id, hp, stats, proficiencies, expertises, cantrips, spells, actions, instrument, deityId, fightingStyleId, archetypeId, naturalExplorerId)
                .then(() => {
                    form.reset()

                    onCharacterCreated()
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const renderOthers = () => {
        if (characterClass.name === 'Bard'){
            return <div>
                <h4>YOUR INSTRUMENT</h4>

                <p className='spell-p'>{instrument}</p>
            </div>
        }

        if (characterClass.name.includes('Domain')){
            return <div>
            <h4>YOUR DEITY</h4>

            <p className='spell-p'>{deity.name}</p>
        </div>
        }

        if (characterClass.name === 'Fighter'){
            return <div>
            <h4>YOUR FIGHTING STYLE</h4>

            <p className='spell-p'>{fightingStyle.name}</p>
        </div>
        }

        if (characterClass.name === 'Ranger'){
            return <div>
                <h4>YOUR TYPE OF RANGER</h4>

                <p className='spell-p'><strong>Your Favoured Enemy: </strong>{archetype.name}</p>
                <p className='spell-p'><strong>Your Natural Explorer: </strong>{naturalExplorer
                .name}</p>
            </div>
        }
    }

    return <div>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <h1>CONFIRM YOUR CHARACTER</h1>

        <form className='character-form' onSubmit={handleSubmit}>
            <ClassAndNameInfo item={ [parentRace, parentClass]} />

            <div>
                <h4><strong>HP: </strong>{hp}</h4>
            </div>

            <label htmlFor='name' className='name-label'>Write your character name</label>
            <input type='text' id='name' required></input>

            <Stats/>

            <Proficiencies/>

            <Expertises/>

            <Spells item={[setParentRace, setParentClass]}/>

            <Actions item={actions}/>

            { renderOthers() }

            <div className="select-button-div">
                <button className="select-button" type='submit'>CREATE</button>
            </div>
        </form>
    </div>
}

export default ConfirmCharacter