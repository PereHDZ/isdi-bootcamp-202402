import logic from '../../logic'

import { useState, useEffect } from 'react'

import SelectRaceComponent from './SelectRaceComponent'

function RaceList({ stamp }){
    const [races, setRaces] = useState([])

    const loadRaces = () => {
        try {
            logic.retrieveParentRaces()
                .then(setRaces)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        loadRaces()
    }, [stamp])

    return <section className='select-section'>
        {races.map(race => <SelectRaceComponent key={race.id} item={race}/>)}
    </section>
}

export default RaceList