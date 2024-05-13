import logic from '../../logic'

import { useEffect, useState } from 'react'

import { useCharacter } from '../../pages/Home'

import RenderClassAndName from './RenderClassAndName'
import RenderStats from './RenderStats'
import RenderProficiencies from './RenderProficiencies'
import RenderExpertises from './RenderExpertises'
import RenderSpells from './RenderSpells'

function CharacterInfo() {
    const { character, setCharacter } = useCharacter()

    const [characterClass, setCharacterClass] = useState(null)

    const [actionsData, setActionsData] = useState([])

    const [setAuthor] = useState(null)

    const [deity, setDeity] = useState(null)
    const [fightingStyle, setFightingStyle] = useState(null)
    const [archetype, setArchetype] = useState(null)
    const [naturalExplorer, setNaturalExplorer] = useState(null)

    const handleXClick = () => {
        setCharacter(null)
    }

    useEffect(() => {
        try {
            logic.retrieveCharacterClass(character.class)
                .then(setCharacterClass)
        } catch (error) {
            alert(error)
        }

        try {
            logic.retrieveUser(character.author)
                .then(setAuthor)
        } catch (error) {
            alert(error)
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

            <RenderProficiencies item={character}/>

            <RenderExpertises item={character}/>

            <RenderSpells item={character}/>

            { renderActions() }

            { renderOthers() }
        </div>
    </section>
}

export default CharacterInfo