import logic from '../logic'

import { useState, useEffect } from 'react'

import { useRaceId } from '../pages/Home'

import SelectSubraceComponent from './SelectSubraceComponent'

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

    return <section className='select-section'>
        {subraces.map(subrace => <SelectSubraceComponent key={subrace.name} item={subrace}/>)}
    </section>
}

export default SubraceList