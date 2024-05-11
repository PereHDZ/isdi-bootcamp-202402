import { useCharacterClass, useSpells } from '../pages/Home'
import { useState, useEffect } from 'react'

import logic from '../logic'

function ConfirmSubclass({ onReturnClick, onSubclassSelected }){
    const { characterClass } = useCharacterClass()
    const { spells, setSpells } = useSpells()
    const [spellsData, setSpellsData] = useState([])

    useEffect(() => {
        if (!(characterClass)) {
            onReturnClick()

            return
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

    // const getActions = () => {
        
    // }

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

        {/* { characterClass && getActions() } */}

    </div>

    <div className="select-button-div">
        <button className="select-button" onClick={handleSelectSubclassClick}>SELECT</button>
    </div> 
</section>
}

export default ConfirmSubclass