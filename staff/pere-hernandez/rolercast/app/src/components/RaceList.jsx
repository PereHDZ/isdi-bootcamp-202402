import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import SelectAtribute from './SelectAtribute'

function RaceList({ stamp }){
    const [races, setRaces] = useState([])

    const loadRaces = () => {
        logger.debug('RaceList -> loadRaces')

        try {
            logic.retrieveRaces()
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
        {races.map(race => <SelectAtribute key={race.name} item={race}/>)}
    </section>
}

export default RaceList