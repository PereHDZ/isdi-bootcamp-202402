import logic from '../logic'
import { useCharacterClass } from '../pages/Home'
import { useEffect, useState } from 'react'

function ConfirmCharacterClass({ onReturnClick, onCharacterClassSelected }){
    const { characterClass } = useCharacterClass()
    const [classActionsData, setClassActionsData] = useState([])

    useEffect(() => {
        if (!(characterClass)) {
            onReturnClick()

            return
        }
    }, [])

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const handleSelectClassClick = () => {
        event.preventDefault()

        onCharacterClassSelected()
    }

    const getSavingThrowProficiencies = () => {
        const declaredAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']

        const matchingAttributes = Object.keys(characterClass.savingThrowProficiencies).filter(attribute =>
            declaredAttributes.includes(attribute))

        const p = matchingAttributes.join(', ')

        return <p><strong>Saving Throw Proficiencies: </strong>{p}</p>
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

    const renderClassActions = () => {
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

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <div className="select-atribute-article atribute-title full-width">
            <div className="transparent-button">
                <img src={`../../public/gallery/Classes_Icons/Class_${characterClass && characterClass.name}_Badge_Icon.png`} className="select-button-icon" />
            </div>

            <h2 className='confirm-class-h2'>{characterClass && characterClass.name}</h2>
        </div>

        <div className='display-info-div'>
            <p className='display-info-p'>{characterClass && characterClass.description}</p>

            <h3>CLASS FEATURES</h3>

            <p><strong>HP:</strong></p>
            <ul>
                <li><strong>Base HP: </strong>{characterClass && characterClass.hp} + Constitution Modifier</li>
                <li><strong>HP gained on Level Up: </strong>+{characterClass && characterClass.hpPerLevel}</li>
            </ul>

            <p><strong>Key Abilities:</strong></p>
            <ul>
                { characterClass && characterClass.keyAbilities.map((keyAbility, index) => (
                    <li key={index}>{keyAbility}</li>
                ))}
            </ul>

            { characterClass && getSavingThrowProficiencies() }

            { characterClass && getProficiencies() }

            { characterClass && <p><strong>Spellcasting Ability: </strong>{ characterClass.spellcastingAbility }</p> }

            { characterClass && characterClass.spellcasting && <p><strong>Spellcasting: </strong>You will de able to choose {characterClass.spellcasting.cantripCount} cantrips and {characterClass.spellcasting.spellCount} spells from the {characterClass.name} Spell List.</p>}

            { characterClass && characterClass.classActions.length > 0 && renderClassActions() }

        </div>

        <div className="select-button-div">
            <button className="select-button" onClick={handleSelectClassClick}>SELECT</button>
        </div>
    </section>
}

export default ConfirmCharacterClass