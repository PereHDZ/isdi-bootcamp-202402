import logic from '../logic'

import { useEffect, useState } from 'react'
import { useRace, useCharacterClass, useBackground, useHp, useStats, useProficiencies, useExpertises, useCantrips, useSpells, useInstrument, useDeity, useFightingstyle, useArchetype, useNaturalExplorer } from '../pages/Home'

import ReturnButton from '../components/commonComponents/ReturnButton'
import ClassAndNameInfo from '../components/confirmCharacterComponents/ClassAndNameInfo'
import Stats from '../components/confirmCharacterComponents/Stats'
import Proficiencies from '../components/confirmCharacterComponents/Proficiencies'
import Expertises from '../components/confirmCharacterComponents/Expertises'

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

    const [cantripsData, setCantripsData] = useState([])
    const [spellsData, setSpellsData] = useState([])

    const [actions, setActions] = useState([])
    const [actionsData, setActionsData] = useState([])

    useEffect(() => {
        if (race.parent){
            try {
                logic.retrieveRace(race.parent)
                    .then(setParentRace)
            } catch (error) {
                alert(error)
            }
        }

        if (characterClass.parent){
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(setParentClass)
            } catch(error) {
                alert(error)
            }
        }

        if (cantrips.length > 0) {
            const fetchCantripsData = () => {
                Promise.all(
                    cantrips.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setCantripsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip:', error)
                    return null
                })
            }
            fetchCantripsData()
        }

        if (spells.length > 0) {
            const fetchSpellsData = () => {
                Promise.all(
                    spells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip:', error)
                    return null
                })
            }
            fetchSpellsData()
        }
    }, [])

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

    useEffect(() => {
        const fetchActionsData = () => {
            Promise.all(
                actions.map(actionId => logic.retrieveAction(actionId)
                    .then(objectAction => objectAction))
            ).then(fetchedData => {
                const filteredData = fetchedData.filter(Boolean)
                setActionsData(filteredData)
            }).catch(error => {
                console.error('Error fetching action:', error)
                return null
            })
        }
        fetchActionsData()
    }, [actions])

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

    const renderSpells = () => {
        let cantripsDiv = <></>
        let spellsDiv = <></>

        if (cantrips.length > 0 ){
            const cantripNames = cantripsData.map(cantrip => cantrip.name).join(', ')

            cantripsDiv = <div>
                <h4>YOUR CANTRIPS</h4>

                <p className='spell-p'>{cantripNames}</p>
            </div>
        }

        if (spells.length > 0 ){
            const spellNames = spellsData.map(spell => spell.name).join(', ')

            spellsDiv = <div>
                <h4>YOUR SPELLS</h4>

                <p className='spell-p'>{spellNames}</p>
            </div>
        }
        
        return <>{cantripsDiv}{spellsDiv}</>
    }

    const renderActions = () => {
        let actionsDiv = <></>

        if (actionsData.length > 0){
            const actionNames = actionsData.map(action => action.name).join(', ')

            actionsDiv = <div>
                <h4>YOUR ACTIONS</h4>

                <p className='spell-p'>{actionNames}</p>
            </div>
        }

        return actionsDiv
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

            { renderSpells() }

            { renderActions() }

            { renderOthers() }

            <div className="select-button-div">
                <button className="select-button" type='submit'>CREATE</button>
            </div>
        </form>
    </div>
}

export default ConfirmCharacter