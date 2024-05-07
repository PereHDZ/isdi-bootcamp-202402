import { useCharacterClass } from '../pages/Home'
import { useState, useEffect } from 'react'

import logic from '../logic'

function ConfirmSubclass({ onReturnClick, onSubclassSelected }){
    const { characterClass } = useCharacterClass()

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

    </div>

    <div className="select-button-div">
        <button className="select-button" onClick={handleSelectSubclassClick}>SELECT</button>
    </div> 
</section>
}

export default ConfirmSubclass