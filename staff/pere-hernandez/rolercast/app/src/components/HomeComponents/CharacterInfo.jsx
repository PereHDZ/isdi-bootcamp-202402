import logic from '../../logic'

import { useEffect, useState } from 'react'

import { useCharacter } from '../../pages/Home'

import RenderClassAndName from './RenderClassAndName'
import RenderStats from './RenderStats'

function CharacterInfo() {
    const { character, setCharacter } = useCharacter()

    const [race, setRace] = useState(null)
    const [parentRace, setParentRace] = useState(null)

    const [characterClass, setCharacterClass] = useState(null)
    const [parentClass, setParentClass] = useState(null)

    const [background, setBackground] = useState(null)

    const [cantripsData, setCantripsData] = useState([])
    const [spellsData, setSpellsData] = useState([])
    const [actionsData, setActionsData] = useState([])

    const [author, setAuthor] = useState(null)

    const [deity, setDeity] = useState(null)
    const [fightingStyle, setFightingStyle] = useState(null)
    const [archetype, setArchetype] = useState(null)
    const [naturalExplorer, setNaturalExplorer] = useState(null)

    const handleXClick = () => {
        setCharacter(null)
    }

    useEffect(() => {
        try {
            logic.retrieveRace(character.race)
                .then(setRace)
        } catch (error) {
            alert(error)
        }

        try {
            logic.retrieveCharacterClass(character.class)
                .then(setCharacterClass)
        } catch (error) {
            alert(error)
        }

        try {
            logic.retrieveBackground(character.background)
                .then(setBackground)
        } catch(error) {
            alert(error)
        }

        try {
            logic.retrieveUser(character.author)
                .then(setAuthor)
        } catch (error) {
            alert(error)
        }

        if (!!character.cantrips){
            const fetchedCantripsData = () => {
                Promise.all(
                    character.cantrips.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setCantripsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip: ', error)
                    return null
                })
            }
            fetchedCantripsData()
        }

        if (!!character.spells){
            const fetchedSpellsData = () => {
                Promise.all(
                    character.spells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching spell: ', error)
                    return null
                })
            }
            fetchedSpellsData()
        }

        if (!!character.actions){
            const fetchedActionsData = () => {
                Promise.all(
                    character.actions.map(actionId => logic.retrieveAction(actionId)
                        .then(objectAction => objectAction))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setActionsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching action: ', error)
                    return null
                })
            }
            fetchedActionsData()
        }

        if (!!character.deity){
            try {
                logic.retrieveDeity(character.deity)
                    .then(setDeity)
            } catch (error) {
                alert (error)
            }
        }

        if (!!character.fightingStyle){
            try {
                logic.retrieveFightingStyle(character.fightingStyle)
                    .then(setFightingStyle)
            } catch (error) {
                alert (error)
            }
        }

        if (!!character.naturalExplorer){
            try {
                logic.retrieveNaturalExplorer(character.naturalExplorer)
                    .then(setNaturalExplorer)
            } catch (error) {
                alert (error)
            }
        }

        if (!!character.archetype){
            try {
                logic.retrieveArchetype(character.archetype)
                    .then(setArchetype)
            } catch (error) {
                alert (error)
            }
        }
    }, [])
    


    const renderProficiencies = () => {
        const armourAttributes = Object.keys(character.proficiencies.armour).filter(key => key !== '_id')
        const weaponsAttributes = Object.keys(character.proficiencies.weapons).filter(key => key !== '_id')
        const skillsAttributes = Object.keys(character.proficiencies.skills).filter(key => key !== '_id')

        const armourString = armourAttributes.join(', ')
        const weaponsString = weaponsAttributes.join(', ')
        const skillsString = skillsAttributes.join(', ')

        return <div>
            <div className='center'>
                <h4>YOUR ARMOUR PROFICIENCIES</h4>

                <p className='spell-p'>{armourString}</p>
            </div>

            <div className='center'>
                <h4>YOUR WEAPON PROFICIENCIES</h4>

                <p className='spell-p'>{weaponsString}</p>
            </div>

            <div className='center'>
                <h4>YOUR SKILL PROFICIENCIES</h4>

                <p className='spell-p'>{skillsString}</p>
            </div>
        </div>
    }

    const renderExpertises = () => {
        if (!!character.expertises){
            const skillsAttributes = Object.keys(character.expertises).filter(key => key !== '_id')

            const skillsString = skillsAttributes.join(', ')
    
            return <div>    
                <div className='center'>
                    <h4>YOUR EXPERTISES</h4>
    
                    <p className='spell-p'>{skillsString}</p>
                </div>
            </div>
        }

    }

    const renderSpells = () => {
        let cantripsDiv = <></>
        let spellsDiv = <></>

        if (cantripsData.length > 0 ){
            const cantripNames = cantripsData.map(cantrip => cantrip.name).join(', ')

            cantripsDiv = <div className='center'>
                <h4>YOUR CANTRIPS</h4>

                <p className='spell-p'>{cantripNames}</p>
            </div>
        }

        if (spellsData.length > 0 ){
            const spellNames = spellsData.map(spell => spell.name).join(', ')

            spellsDiv = <div className='center'>
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

            actionsDiv = <div className='center'>
                <h4>YOUR ACTIONS</h4>

                <p className='spell-p'>{actionNames}</p>
            </div>
        }

        return actionsDiv
    }

    const renderOthers = () => {
        if (!!characterClass && characterClass.instrument){
            return <div className='center'>
                <h4>YOUR INSTRUMENT</h4>

                <p className='spell-p'>{character.instrument}</p>
            </div>
        }

        if (!!deity){
            return <div className='center'>
            <h4>YOUR DEITY</h4>

            <p className='spell-p'>{deity.name}</p>
        </div>
        }

        if (!!fightingStyle){
            return <div className='center'>
            <h4>YOUR FIGHTING STYLE</h4>

            <p className='spell-p'>{fightingStyle.name}</p>
        </div>
        }

        if (!!characterClass && characterClass.name === 'Ranger'){
            return <div className='center'>
                <h4>YOUR TYPE OF RANGER</h4>

                <p className='spell-p'><strong>Your Favoured Enemy: </strong>{!!archetype && archetype.name}</p>
                <p className='spell-p'><strong>Your Natural Explorer: </strong>{!!naturalExplorer && naturalExplorer
                .name}</p>
            </div>
        }
    }


    return <section className='character-info-section'>
        <div className='character-info-div'>
            <button className='transparent-button end' onClick={handleXClick}>
                <img src={`../../public/icons/IconoirXmark.png`} className='x-button'></img>
            </button>

            <RenderClassAndName item={character}/>
            
            <RenderStats item={character}/>

            { renderProficiencies() }

            { renderExpertises() }

            { renderSpells() }

            { renderActions() }

            { renderOthers() }
        </div>
    </section>
}

export default CharacterInfo