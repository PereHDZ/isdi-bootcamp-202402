import logic from '../logic'

import { useRace, useCharacterClass, useSpells } from '../pages/Home'

import { useEffect, useState } from 'react'

function SelectSpells({ onReturn }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { spells } = useSpells()

    const [availableSpells, setAvailableSpells] = useEffect([])

    const handleReturnClick = () => onReturn()

    useEffect(() => {
        if (!characterClass.parent){
            setAvailableSpells(characterClass.spellcasting.availableSpells)
        }
    }, [])

    console.log(availableSpells)
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