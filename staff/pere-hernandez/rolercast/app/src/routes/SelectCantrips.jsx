import logic from '../logic'

import { useRace, useCharacterClass, useCantrips } from '../pages/Home'
import { useEffect, useState } from 'react'

function SelectCantrips({ onReturn, onCantripsConfirmed }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { setCantrips } = useCantrips()

    const [availableCantrips, setAvailableCantrips] = useState([])
    const [availableCantripsData, setAvailableCantripsData] = useState([])
    const [maxCantrips, setMaxCantrips] = useState(null)

    const [checkedCantrips, setCheckedCantrips] = useState([])

    const [cantripsSelected, setCantripsSelected] = useState([])
    const [cantripsData, setCantripsData] = useState([])

    const handleReturnClick = () => onReturn()

    const handleConfirmClick = () => {
        event.preventDefault()

        setCantrips(cantripsSelected)

        onCantripsConfirmed()
    }

    useEffect(() => {
        if (!characterClass.parent){
            setAvailableCantrips(characterClass.spellcasting.availableCantrips)
        } else {
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(parentClass => {
                        const parentAvailableCantrips = parentClass.spellcasting.availableCantrips

                        if (characterClass.name === 'Nature Domain'){
                            const newAvailableCantrips = parentAvailableCantrips.concat(characterClass.spellcasting.availableCantrips)

                            setAvailableCantrips(newAvailableCantrips)
                        } else {
                            setAvailableCantrips(parentAvailableCantrips)
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

    const handleCheckboxChange = (event) => {
        const selectedCantrip = event.target.value
        let newCheckedCantrips = checkedCantrips

        if (event.target.checked){
            if (checkedCantrips.length < maxCantrips){
                newCheckedCantrips = [...checkedCantrips, selectedCantrip]

                setCheckedCantrips(newCheckedCantrips)

                const newCantripsSelected = [...cantripsSelected, selectedCantrip]
                const filteredNewCantrips = newCantripsSelected.filter((value, index) => newCantripsSelected.indexOf(value) === index)

                setCantripsSelected(filteredNewCantrips)
            } else {
                event.target.checked = false
                alert(`You can only select up to ${maxCantrips} cantrips`)
            }
        } else {
            newCheckedCantrips = checkedCantrips.filter(cantrip => cantrip !== selectedCantrip)
            const newCantripsSelected = cantripsSelected.filter(cantrip => cantrip !== selectedCantrip)

            const filteredNewCantrips = newCantripsSelected.filter((value, index) => newCantripsSelected.indexOf(value) === index)

            setCheckedCantrips(newCheckedCantrips)  
            setCantripsSelected(filteredNewCantrips)
        }       
    }


    const renderAvailableCantrips = () => {
        useEffect(() => {
            const fetchAvailableCantripsData = () => {
                Promise.all(
                    availableCantrips.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip)
                    )
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)

                    const nonDuplicatedData = filteredData.filter((value, index) => filteredData.indexOf(value) === index)
                    
                    setAvailableCantripsData(nonDuplicatedData)
                }).catch(error => {
                    console.error('Error fetching cantrip:', error);
                    return null
                })                
            }
            fetchAvailableCantripsData()
        }, [availableCantrips])

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
                        value={cantrip.id} 
                        className='checkbox-input'
                        onChange={handleCheckboxChange}
                        checked={checkedCantrips.includes(cantrip.id)}
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
            <div className='margin-top'>
                <h3 className='selected-spells-title'>Selected Cantrips:</h3>

                <ul>
                    {cantripsData.map(cantrip => (
                        <li key={cantrip.id} className='spell-li'><strong>{cantrip.name}: </strong>{cantrip.description}</li>
                    ))}
                </ul>
            </div>
        )
    }

    const renderConfirmButton = () => {
        if (checkedCantrips.length === maxCantrips)
            return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT {maxCantrips} CANTRIPS</h1>

        { renderAvailableCantrips() }

        { renderSelectedCantrips() }

        <div className='select-button-div'>
        { renderConfirmButton() }
        </div>
    </section>
}

export default SelectCantrips