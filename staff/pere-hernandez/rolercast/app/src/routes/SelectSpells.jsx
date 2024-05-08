import logic from '../logic'

import { useRace, useCharacterClass, useSpells } from '../pages/Home'

import { useEffect, useState } from 'react'

function SelectSpells({ onReturn }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { spells } = useSpells()

    const [availableSpells, setAvailableSpells] = useState([])

    const [spellsSelected, setSpellsSelected] = useState([])

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

    console.log(spellsSelected)

    
    // const renderAvailableSpells = () => {
    //     useEffect(() => {
    //         const fetchAvailableSpellsData = () => {
    //             Promise.all(
    //                 availableSpells.map(spellId => logic.retrieveSpell(spellId)
    //                     .then(ObjectSpell => ObjectSpell)
    //                     .catch(error => {
    //                         console.error('Error fetching spell:', error)
    //                         return null
    //                     })
    //                 )
    //             ).then(fetchedData => {
    //                 const filteredData = fetchedData.filter(Boolean)
    //                 setAvailableSpells(filteredData)
    //             })
    //         }

    //         fetchAvailableSpellsData()
    //     }, [])
    // }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h3>SELECT YOUR SPELLS</h3>

        {/* { renderAvailableSpells() } */}
    </section>
    
    
    
}

export default SelectSpells