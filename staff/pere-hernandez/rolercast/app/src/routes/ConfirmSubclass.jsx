import { useRace, useCharacterClass, useSpells, useActions } from '../pages/Home'
import { useState, useEffect } from 'react'

import logic from '../logic'

function ConfirmSubclass({ onReturnClick, onSubclassSelected }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { setSpells } = useSpells()
    const { actions, setActions } = useActions()

    const [parentClass, setParentClass] = useState(null)

    const [spellsData, setSpellsData] = useState([])
    const [actionsData, setActionsData] = useState([])

    useEffect(() => {
        if (!(characterClass)) {
            onReturnClick()

            return
        }

        if (characterClass.parent){
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(setParentClass)
            } catch(error) {
                alert(error)
            }
        }

        if (!!characterClass.knownSpells){
            setSpells(characterClass.knownSpells)

            const fetchSpellsData = () => {
                Promise.all(
                    characterClass.knownSpells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell)
                    )
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching spell: ', error)
                    return null
                })
            }
            fetchSpellsData()
        }
    }, [])

    useEffect(() => {
        const newActions = []

        if (!!characterClass.classActions){
            for (let i = 0; i < characterClass.classActions.length; i++){
                newActions.push(characterClass.classActions[i])

                setActions(newActions)
            }            
        }
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

        onReturnClick()
    }

    const handleSelectSubclassClick = () => {
        event.preventDefault()

        onSubclassSelected()
    }

    const getProficiencies = () => {
        let proficienciesObjects = []
        let proficiencies = []

        if(!!characterClass.proficiencies){
            for (const proficiency in characterClass.proficiencies){
                if (proficiency !== '_id' && proficiency !== 'skills')
                    proficienciesObjects.push(characterClass.proficiencies[proficiency])
            }

            for (let i = 0; i < proficienciesObjects.length; i++){
                for (const key in proficienciesObjects[i]){
                    if (key !== '_id' && key !== 'skills' )
                        proficiencies.push(key)
                }
            }

            const p = proficiencies.join(', ')

            return <p><strong>Proficiencies: </strong>{p}</p>
        }
    }

    const getSpells = () => {
        if (spellsData.length > 0){
            const spellNames = spellsData.map(spell => spell.name).join(', ')

            return <div>
                <p><strong>You know the following spells: </strong>{spellNames}</p>
            </div>
        }

        return <></>
    }

    const getActions = () => {
        if (actionsData.length > 0){
            return <div>
                <p><strong>Class Actions and other bonuses:</strong></p>

                <ul>
                    {actionsData.map(action => (
                        <li><strong>{action.name}: </strong>{action.description}</li>
                    ))}
                </ul>
            </div>
        }
    }

    return <section>
    <div className="return-div">
        <button className="transparent-button" onClick={handleReturnClick}>
            <img src="../../public/icons/return.png" className="icon"></img>
        </button>
        <h3 className="return">RETURN</h3>
    </div>

    <div className="select-atribute-article atribute-title full-width">
        <div className="transparent-button">
            <img src={`../../public/gallery/SubClasses_Icons/Class_${characterClass && characterClass.name}_Badge_Icon.png`} className="select-button-icon" />
        </div>

        <h2>{characterClass && characterClass.name}</h2>
    </div>

    <div className="display-info-div">
        <p className="display-info-p">{characterClass && characterClass.description}</p>
        
        <h3>CLASS FEATURES</h3>

        { characterClass && getProficiencies() }

        { characterClass && characterClass.spellcasting && <p><strong>Spellcasting: </strong>You will de able to choose {characterClass.spellcasting.cantripCount} cantrips and {characterClass.spellcasting.spellCount} spells from the {characterClass.name} Spell List.</p>}

        { characterClass && getSpells() }

        { characterClass && getActions() }

    </div>

    <div className="select-button-div">
        <button className="select-button" onClick={handleSelectSubclassClick}>SELECT</button>
    </div> 
</section>
}

export default ConfirmSubclass