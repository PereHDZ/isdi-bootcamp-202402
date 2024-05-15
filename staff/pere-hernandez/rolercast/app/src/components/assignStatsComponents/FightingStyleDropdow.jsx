import logic from '../../logic'

import { useState, useEffect } from 'react'

function FightingStyleDropdown ({ item: [characterClass, chosenFightingStyle, setChosenFightingStyle]}) {
    const [fightingStyles, setFightingStyles] = useState([])

    useEffect(() => {
        if (characterClass.name === 'Fighter'){
            try {
                logic.retrieveFightingStyles()
                    .then(setFightingStyles)
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    const handleFightingStyleChange = (event) => {
        try {
            logic.retrieveFightingStyle(event.target.value)
                .then(setChosenFightingStyle)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    if (characterClass.name === 'Fighter'){
        return <div className='margin-left'>
            <h5 className='deity-title'>SELECT YOUR FIGHTING STYLE</h5>
            <select value={chosenFightingStyle} onChange={handleFightingStyleChange}>
                <option value={''}>Select Fighting Style</option>
                { fightingStyles.map(fightingStyle => {
                    return <option key={fightingStyle.id} value={fightingStyle.id}>{fightingStyle.name}</option>
                })}
            </select>
        </div>
    } else {
        return <></>
    }
}

export default FightingStyleDropdown