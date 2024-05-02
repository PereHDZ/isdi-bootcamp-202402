import { useState, useEffect } from 'react'

import RaceList from '../components/RaceList'

function SelectRace({ onReturn }){
    const handleReturnClick = () => onReturn()

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT YOUR RACE</h1>

        <RaceList/>
    </section>
}

export default SelectRace