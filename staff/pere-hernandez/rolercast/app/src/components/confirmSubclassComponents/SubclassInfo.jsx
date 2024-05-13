import logic from '../../logic'

import { useState, useEffect } from 'react'
import { useActions } from '../../pages/Home'

function SubclassInfo ({ item: characterClass }){
    const { actions, setActions } = useActions()

    const [spellsData, setSpellsData] = useState([])
    const [actionsData, setActionsData] = useState([])

    const newActions = []

    useEffect(() => {
        if (!!characterClass.knownSpells){
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

        if (!!characterClass.classActions){
            for (let i = 0; i < characterClass.classActions.length; i++){
                newActions.push(characterClass.classActions[i])

                setActions(newActions)
            }            
        }
    }, [])

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

            const proficienciesString = proficiencies.join(', ')

            return <p><strong>Proficiencies: </strong>{proficienciesString}</p>
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


    return <div className="display-info-div">
        <p className="display-info-p">{ characterClass.description }</p>
        
        <h3>CLASS FEATURES</h3>

        { getProficiencies() }

        { characterClass.spellcasting && <p><strong>Spellcasting: </strong>You will de able to choose {characterClass.spellcasting.cantripCount} cantrips and {characterClass.spellcasting.spellCount} spells from the {characterClass.name} Spell List.</p>}

        { getSpells() }

        { getActions() }
    </div>
}

export default SubclassInfo