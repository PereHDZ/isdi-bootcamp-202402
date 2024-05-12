import logic from '../logic'

import { useRace, useCharacterClass, useSpells } from '../pages/Home'

import { useEffect, useState } from 'react'

function SelectSpells({ onReturn, onSpellsConfirmed }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { spells, setSpells } = useSpells()

    const [availableSpells, setAvailableSpells] = useState([])
    const [availableSpellsData, setAvailableSpellsData] = useState([])
    const [maxSpells, setMaxSpells] = useState([])

    const [checkedSpells, setCheckedSpells] = useState([])

    const [spellsSelected, setSpellsSelected] = useState([])
    const [spellsData, setSpellsData] = useState([])

    const handleReturnClick = () => onReturn()

    const handleConfirmClick = () => {
        event.preventDefault()

        setSpells(spellsSelected)

        onSpellsConfirmed()
    }

    useEffect(() => {
        if (!characterClass.parent){
            setAvailableSpells(characterClass.spellcasting.availableSpells)
        } else {
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(parentClass => {
                        const parentAvailableSpells = parentClass.spellcasting.availableSpells

                        if (characterClass.name.includes('The ')){
                            const newAvailableSpells = parentAvailableSpells.concat(characterClass.spellcasting.availableSpells)

                            setAvailableSpells(newAvailableSpells)
                        } else {
                            setAvailableSpells(parentAvailableSpells)
                        }
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    useEffect(() => {
        const newSelectedSpells = [...spells]

        if (race.name === 'Forest Gnome'){
            newSelectedSpells.push(race.features.additionalSpell.spell)
        }

        if (characterClass.name.includes('Domain')){
            for (let i = 0; i < characterClass.knownSpells.length; i++){
                newSelectedSpells.push(characterClass.knownSpells[i])
            }            
        }

        setSpellsSelected(newSelectedSpells)
    }, [])

    const handleCheckboxChange = (event) => {
        const selectedSpell = event.target.value
        let newCheckedSpells = checkedSpells

        if (event.target.checked){
            if (checkedSpells.length < maxSpells){
                newCheckedSpells = [...checkedSpells, selectedSpell]

                setCheckedSpells(newCheckedSpells)
                setSpellsSelected([...spellsSelected, selectedSpell])
            } else {
                event.target.checked = false
                alert(`You can onlu select up to ${maxSpells} spells`)
            }
        } else {
            newCheckedSpells = checkedSpells.filter(spell => spell !== selectedSpell)
            const newSpellsSelected = spellsSelected.filter(spell => spell !== selectedSpell)

            setCheckedSpells(newCheckedSpells)
            setSpellsSelected([...newSpellsSelected])
        }
    }
    
    const renderAvailableSpells = () => {
        useEffect(() => {
            const fetchAvailableSpellsData = () => {
                Promise.all(
                    availableSpells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell)
                    )
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setAvailableSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching spell:', error)
                    return null
                })
            }
            fetchAvailableSpellsData()
        }, [availableSpells])

        useEffect(() => {
            if (!characterClass.parent)
                setMaxSpells(characterClass.spellcasting.spellCount)
            else {
                try {
                    logic.retrieveCharacterClass(characterClass.parent)
                        .then(parentClass => {
                            setMaxSpells(parentClass.spellcasting.spellCount)
                        })
                        .catch(error => alert(error))
                } catch (error) {
                    alert(error)
                }
            }
        }, [])

        return <div>
            {availableSpellsData.map(spell => (
                <div className='align-center'>
                    <input
                        type='checkbox'
                        value={spell.id}
                        className='checkbox-input'
                        onChange={handleCheckboxChange}
                        checked={checkedSpells.includes(spell.id)}
                    />
                    <label className='cantrip-check'>{spell.name}</label>
                </div>
            ))}
        </div>
    }

    const renderSelectedSpells = () => {
        useEffect(() => {
            const fetchSpellsData = () => {
                Promise.all(
                    spellsSelected.map(spellId => 
                        logic.retrieveSpell(spellId)
                            .then(objectSpell => objectSpell)
                            .catch(error => {
                                console.error('Error fetching spell:', error)
                                return null
                            })
                    )
                ).then(fetchData => {
                    const filteredData = fetchData.filter(Boolean)
                    setSpellsData(filteredData)
                })
            }

            fetchSpellsData()
        }, [spellsSelected])

        return (
            <div className='margin-top'>
                <h3 className='selected-spells-title'>Selected Spells:</h3>

                <ul>
                    {spellsData.map(spell => (
                        <li key={spell.id}
                        className='spell-li'><strong>{spell.name}: </strong>{spell.description}</li>
                    ))}
                </ul>
            </div>
        )
    }

    const renderConfirmButton = () => {
        if (checkedSpells.length === maxSpells)
            return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT {maxSpells} SPELLS</h1>

        { renderAvailableSpells() }

        { renderSelectedSpells() }

        <div className='select-button-div'>
            { renderConfirmButton() }
        </div>
    </section> 
}

export default SelectSpells