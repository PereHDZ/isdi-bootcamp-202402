import logic from '../logic'

import { useState, useEffect } from 'react'

import { useRace } from '../pages/Home'

import SelectSubraceComponent from './SelectSubraceComponent'

function SubraceList({ stamp }){
    const {race} = useRace()
    const [subraces, setSubraces] = useState([])

    const loadSubraces = () => {
        try {
            logic.retrieveSubracesFromRace(race._id)
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