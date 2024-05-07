import { useRace, useCharacterClassId, useSpells } from '../pages/Home'

import logic from '../logic'
import { useEffect, useState } from 'react'

function SelectSpells({ onReturn }){
    const { race, setRace } = useRace()
    const { characterClassId } = useCharacterClassId()
    const { spells } = useSpells()
    const [spellsSelected, setSpellsSelected] = useState([])

    const handleReturnClick = () => onReturn()

    useEffect(() => {
        if(!!race && !!race.features.tieflingMagic)
            console.log(':)')
    }, [])

    const renderSelectedSpells = () => {
        return <div>
            {spellsSelected.map(spell => <p>{spell}</p>)}
        </div>
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h3>SELECT YOUR SPELLS</h3>

        { renderSelectedSpells() }
    </section>
}

export default SelectSpells