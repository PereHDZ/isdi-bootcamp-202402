import logic from '../../logic'

import { useState, useEffect } from 'react'

function ArchetypeDropdown ({ item: [characterClass, chosenArchetype, setChosenArchetype] }) {
    const [archetypes, setArchetypes] = useState([])

    useEffect(() => {
        if (characterClass.name === 'Ranger'){
            try{
                logic.retrieveArchetypes()
                    .then(setArchetypes)
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    const handleArchetypeChange = (event) => {
        try {
            logic.retrieveArchetype(event.target.value)
                .then(setChosenArchetype)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    if (characterClass.name === 'Ranger'){
        return <div className='margin-left'>
            <h5 className='deity-title'>SELECT YOUR FAVOURED ENEMY</h5>
            <select value={chosenArchetype} onChange={handleArchetypeChange}>
                <option value={null}>Select Favoured Enemy</option>
                { archetypes.map(archetype => {
                    return <option key={archetype.id} value={archetype.id}>{archetype.name}</option>
                })}
            </select>
        </div>
    } else {
        return <></>
    }
} 

export default ArchetypeDropdown