import logic from '../logic'

import { useRace, useCharacterClass, useSpells } from '../pages/Home'

import { useEffect, useState } from 'react'

function SelectSpells({ onReturn }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { spells } = useSpells()

    const [availableSpells, setAvailableSpells] = useState([])
    const [availableSpellsData, setAvailableSpellsData] = useState([])
    const [maxSpells, setMaxSpells] = useState([])

    const [spellsSelected, setSpellsSelected] = useState([])
    const [spellsData, setSpellsData] = useState([])

    const handleReturnClick = () => onReturn()

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
        if (race.name === 'Forest Gnome'){
            const newSelectedSpells = [race.features.additionalSpell.spell]

            setSpellsSelected(newSelectedSpells)
        }
    }, [])

    useEffect(() => {
        if (characterClass.name.includes('Domain')){
            const newSelectedSpells = characterClass.knownSpells

            setSpellsSelected(newSelectedSpells)
        }
    }, [])
    
    const renderAvailableSpells = () => {
        useEffect(() => {
            const fetchAvailableSpellsData = () => {
                Promise.all(
                    availableSpells.map(spellId => logic.retrieveSpell(spellId)
                        .then(ObjectSpell => ObjectSpell)
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
                        // onChange={handleCheckboxChange}
                        // checked={checkedSpells.includes(spell.div)}
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

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT YOUR SPELLS</h1>

        { renderAvailableSpells() }

        { renderSelectedSpells() }
    </section> 
}

export default SelectSpells