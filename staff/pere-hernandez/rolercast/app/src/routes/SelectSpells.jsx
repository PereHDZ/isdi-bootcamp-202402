import { useRace, useCharacterClass, useSpells } from '../pages/Home'

import { useEffect, useState } from 'react'

function SelectSpells({ onReturn }){
    const handleReturnClick = () => onReturn()

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h3>SELECT YOUR SPELLS</h3>
    </section>
    
    
    
}

export default SelectSpells