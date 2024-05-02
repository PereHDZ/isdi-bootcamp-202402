import logic from '../logic'

import { useState, useEffect } from 'react'

import SelectCharacterClassComponent from './SelectCharacterClassComponent'

function CharacterClassList({ stamp }){
    const [characterClasses, setCharacterClasses] = useState([])

    const loadCharacterClasses = () => {
        try {
            logic.retrieveCharacterClasses()
                .then(setCharacterClasses)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        loadCharacterClasses()
    }, [stamp])

    return <section className='select-section'>
        {characterClasses.map(characterClass => <SelectCharacterClassComponent key={characterClass.name} item={characterClass}/>)}
    </section>
}

export default CharacterClassList