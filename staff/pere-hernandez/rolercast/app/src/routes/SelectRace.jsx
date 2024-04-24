import { useState, useEffect } from 'react'

import RaceList from '../components/RaceList'

function SelectRace(){
    const [races, setRaces] = useState(null)

    return <section>
        <h1 className='home-title'>SELECT YOUR RACE</h1>

        <RaceList/>
    </section>
}

export default SelectRace