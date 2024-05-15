import logic from '../../logic'

import { useState, useEffect } from 'react'

function NaturalExplorerDropdown ({ item: [characterClass, chosenNaturalExplorer, setChosenNaturalExplorer] }) {
    const [naturalExplorers, setNaturalExplorers] = useState([])

    useEffect(() => {
        if (characterClass.name === 'Ranger'){
            try{
                logic.retrieveNaturalExplorers()
                    .then(newNaturalExplorers => {
                        setNaturalExplorers(newNaturalExplorers)
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    const handleNaturalExplorerChange = (event) => {
        try {
            logic.retrieveNaturalExplorer(event.target.value)
                .then(setChosenNaturalExplorer)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    if (characterClass.name === 'Ranger'){
        return <div className='margin-left'>
            <h5 className='deity-title'>SELECT YOUR NATURAL EXPLORER</h5>
            <select value={chosenNaturalExplorer} onChange={handleNaturalExplorerChange}>
                <option value={null}>Select Natural Explorer</option>
                { naturalExplorers.map(naturalExplorer => {
                    return <option key={naturalExplorer.id} value={naturalExplorer.id}>{naturalExplorer.name}</option>
                })}
            </select>
        </div>
    } else {
        return <></>
    }
}

export default NaturalExplorerDropdown