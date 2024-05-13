import logic from '../../logic'
import { useState, useEffect } from 'react'

function ClassInfo({ item: characterClass }){
    const [classActionsData, setClassActionsData] = useState([])

    const getSavingThrowProficiencies = () => {
        const declaredAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']

        const matchingAttributes = Object.keys(characterClass.savingThrowProficiencies).filter(attribute =>
            declaredAttributes.includes(attribute))

        const attributesString = matchingAttributes.join(', ')

        return <p><strong>Saving Throw Proficiencies: </strong>{attributesString}</p>
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

            const proficienciesString = proficiencies.join(', ')

            return <p><strong>Proficiencies: </strong>{proficienciesString}</p>
        }
    }

    const renderClassActions = () => {
        if (characterClass.classActions.length > 0){
            useEffect(() => {
                const fetchClassActionsData = () => {
                    Promise.all(
                        characterClass.classActions.map(classActionId => logic.retrieveAction(classActionId)
                            .then(ObjectClassAction => ObjectClassAction)
                        )
                    ).then(fetchedData => {
                        const filteredData = fetchedData.filter(Boolean)
                        setClassActionsData(filteredData)
                    }).catch(error => {
                        console.error('Error fetching classData:', error)
                        return null
                    })
                }
    
                fetchClassActionsData()
            }, [characterClass])
    
            return <div>
                <p><strong>Class Actions and other bonuses: </strong></p>
                
                <ul>
                    {classActionsData.map(classAction => (
                        <li><strong>{classAction.name}: </strong>{classAction.description}</li>
                    ))}
                </ul>
            </div>
        }        
    }

    return <div className='display-info-div'>
    <p className='display-info-p'>{ characterClass.description}</p>

    <h3>CLASS FEATURES</h3>

    <p><strong>HP:</strong></p>
    <ul>
        <li><strong>Base HP: </strong>{characterClass.hp} + Constitution Modifier</li>
        <li><strong>HP gained on Level Up: </strong>+{characterClass.hpPerLevel}</li>
    </ul>

    <p><strong>Key Abilities:</strong></p>
    <ul>
        { characterClass.keyAbilities.map((keyAbility, index) => (
            <li key={index}>{keyAbility}</li>
        ))}
    </ul>

    { getSavingThrowProficiencies() }

    { getProficiencies() }

    { <p><strong>Spellcasting Ability: </strong>{ characterClass.spellcastingAbility }</p> }

    { characterClass.spellcasting && <p><strong>Spellcasting: </strong>You will de able to choose {characterClass.spellcasting.cantripCount} cantrips and {characterClass.spellcasting.spellCount} spells from the {characterClass.name} Spell List.</p>}

    { renderClassActions() }
</div>
}

export default ClassInfo