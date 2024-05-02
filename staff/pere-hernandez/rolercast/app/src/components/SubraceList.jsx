import logic from '../logic'

import { useState, useEffect } from 'react'

import { useRaceId } from '../pages/Home'

function SubraceList({ stamp }){
    const {raceId, setRaceId} = useRaceId()
    const [subraces, setSubraces] = useState([])

    const loadSubraces = () => {
        try {
            logic.retrieveSubracesFromRace(raceId)
                .then(setSubraces)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        loadSubraces()
    }, [stamp])

    return <section className='selec-section'>
        {subraces.map(subrace => <h1>{subrace.name}</h1>)}
    </section>
}

export default SubraceList