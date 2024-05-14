import logic from '../../logic'

import { useEffect, useState } from 'react'

function DeityDropdown({ item: [characterClass, race,  chosenDeity, setChosenDeity] }) {
    const [deities, setDeities] = useState([])

    useEffect(() => {
        if (characterClass.name.includes('Domain')){
            try {
                logic.retrieveDeities()
                    .then(retrievedDeities => {
                        const laduguer = retrievedDeities.find(deity => deity.name === 'Laduguer')
                        const vlaakith = retrievedDeities.find(deity => deity.name === 'Vlaakith')

                        const filteredDeities = retrievedDeities.filter(deity => deity.name !== 'Laduguer' &&  deity.name !== 'Vlaakith')

                        if (race.name === 'Duergar'){
                            filteredDeities.push(laduguer)

                            setDeities(filteredDeities)
                        } else if (race.name === 'Seldarine Drow'){
                            const seldarineDeities = filteredDeities.filter(deity => deity.name !== 'Lolth')

                            setDeities(seldarineDeities)
                        } else if (race.name === 'Githyanki'){
                            filteredDeities.push(vlaakith)

                            setDeities(filteredDeities)
                        } else {
                            setDeities(filteredDeities)
                        }
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }         
        }
    }, [])

    useEffect(() => {
        if (race.name === 'Lolth-Sworn Drow' && characterClass.name.includes('Domain')){
            const lolth = deities.find(deity => deity.name === 'Lolth')

            setChosenDeity(lolth)
        }
    }, [])

    const handleDeityChange = (event) => {
        try {
            logic.retrieveDeity(event.target.value)
                .then(setChosenDeity)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    if (characterClass.name.includes('Domain')){
        return <div className='margin-left'>
            <h5 className='deity-title'>SELECT YOUR DEITY</h5>
            <select value={chosenDeity} onChange={handleDeityChange}>
                <option value={null}>Select Deity</option>
                { deities.map(deity => {
                    return <option key={deity._id} value={deity._id}>{deity.name}</option>
                })}
            </select>
        </div>
    } else {
        return <></>
    }
} 

export default DeityDropdown