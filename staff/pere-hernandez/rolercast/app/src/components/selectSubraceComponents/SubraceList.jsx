import logic from '../../logic'

import { useState, useEffect } from 'react'

import { useRace } from '../../pages/Home'

import SelectSubraceComponent from './SelectSubraceComponent'

function SubraceList({ stamp }){
    const {race} = useRace()
    const [subraces, setSubraces] = useState([])

    const loadSubraces = () => {
        let raceId

        if (race.id){
            raceId = race.id
        } else {
            raceId = race._id
        } 
        
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
        {subraces.map(subrace => <SelectSubraceComponent key={subrace.id} item={subrace}/>)}
    </section>
}

export default SubraceList