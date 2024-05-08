import logic from '../logic'

import { useRace, useCharacterClass, useCantrips, useSpells } from '../pages/Home'
import { useEffect, useState } from 'react'

function SelectSpells({ onReturn }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { cantrips } = useCantrips()
    const { spells } = useSpells()

    const [availableCantrips, setAvailableCantrips] = useState([])
    const [availableCantripsData, setAvailableCantripsData] = useState([])
    const [maxCantrips, setMaxCantrips] = useState(null)

    const [checkedCantrips, setCheckedCantrips] = useState([])

    const [cantripsSelected, setCantripsSelected] = useState([])
    const [cantripsData, setCantripsData] = useState([])

    const [spellsSelected, setSpellsSelected] = useState([])

    const handleReturnClick = () => onReturn()

    useEffect(() => {
        if (!characterClass.parent){
            setAvailableCantrips(characterClass.spellcasting.availableCantrips)
        } else {
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(parentClass => {
                        let parentAvailableCantrips = parentClass.spellcasting.availableCantrips

                        if (characterClass.name === 'Nature Domain'){
                            const newAvailableCantrips = parentAvailableCantrips.concat(characterClass.spellcasting.availableCantrips)

                            setAvailableCantrips(newAvailableCantrips)
                        }                         
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    useEffect(() => {
        if (race.name.includes('Tiefling')){
            const newSelectedCantrips = [race.features.tieflingMagic.cantrip]
            setCantripsSelected(newSelectedCantrips)
        }
    }, [])

    useEffect(() => {
        if(race.name === 'Githyanki'){
            const newSelectedCantrips = [race.features.githyankiPsionics.cantrip]
            setCantripsSelected(newSelectedCantrips)
        }
    }, [])

    useEffect(() => {
        if (!!race.parent){
            try {
                logic.retrieveRace(race.parent)
                    .then(parentRace => {
                        if (parentRace.name === 'Drow'){
                            const newSelectedCantrips = [parentRace.features.drowMagic.cantrip]
                            setCantripsSelected(newSelectedCantrips)
                        }
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            } 
        }         
    }, [])

    useEffect(() => {
        if(race.name === 'Drow Half-Elf'){
            const newSelectedCantrips = [race.features.drowMagic.cantrip]
            setCantripsSelected(newSelectedCantrips)
        }
    }, [])

    const renderAvailableCantrips = () => {
        useEffect(() => {
            const fetchAvailableCantripsData = () => {
                Promise.all(
                    availableCantrips.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip)
                        .catch(error => {
                            console.error('Error fetching cantrip:', error);
                            return null
                        })
                    )
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setAvailableCantripsData(filteredData)
                })
            }

            fetchAvailableCantripsData()

        }, [availableCantrips])

        const handleCheckboxChange = (event) => {
            const selectedCantrip = event.target.value
            if (event.target.checked){
                if (checkedCantrips.length < maxCantrips){
                    setCheckedCantrips([...checkedCantrips, selectedCantrip])
                } else {
                    event.target.checked = false
                    alert(`to ${maxCantrips} cantripsYou can only select up to ${maxCantrips} cantrips`)
                }
            } else {
                setCheckedCantrips(checkedCantrips.filter(cantrip => cantrip !== selectedCantrip))
            }
        }

        useEffect(() => {
            if (!characterClass.parent)
                setMaxCantrips(characterClass.spellcasting.cantripCount)
            else {
                try {
                    logic.retrieveCharacterClass(characterClass.parent)
                        .then(parentClass => {
                            if (characterClass.name !== 'Nature Domain'){
                                setMaxCantrips(parentClass.spellcasting.cantripCount)
                            } else {
                                setMaxCantrips(parentClass.spellcasting.cantripCount + characterClass.spellcasting.cantripCount)
                            }
                        })
                        .catch(error => alert(error))
                } catch (error) {
                    alert(error)
                }
            }
        }, [])

        return <div>
            {availableCantripsData.map(cantrip => (
                <div className='align-center'>
                    <input 
                        type='checkbox' 
                        value={cantrip._id} 
                        className='checkbox-input'
                        onChange={handleCheckboxChange}
                        checked={checkedCantrips.includes(cantrip._id)}
                    />
                    <label className='cantrip-check'>{cantrip.name}</label>
                </div>
            ))}
        </div>
    }

    const renderSelectedCantrips = () => {
        useEffect(() => {
            const fetchCantripsData = () => {
                Promise.all(
                    cantripsSelected.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip)
                        .catch(error => {
                            console.error('Error fetching cantrip:', error)
                            return null
                        })
                    )
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setCantripsData(filteredData)
                })
            }
    
            fetchCantripsData()
        }, [cantripsSelected])
    
        return (
            <div>
                <h3>Selected Cantrips:</h3>

                <ul>
                    {cantripsData.map(cantrip => (
                        <li key={cantrip.id}><strong>{cantrip.name}: </strong>{cantrip.description}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h3>SELECT {maxCantrips} CANTRIPS</h3>

        { renderAvailableCantrips() }

        { renderSelectedCantrips() }
    </section>
}

export default SelectSpells