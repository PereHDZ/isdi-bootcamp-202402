import logic from '../../logic'

import { useState, useEffect } from 'react'

import { useCharacterClass } from '../../pages/Home'

import SelectSubclassComponent from './SelectSubclassComponent'

function SubclassList({ stamp }){
    const {characterClass} = useCharacterClass()
    const [subclasses, setSubclasses] = useState([])

    const loadSubclasses = () => {
        let characterClassId
        if (characterClass.id){
            characterClassId = characterClass.id
        } else {
            characterClassId = characterClass._id
        }

        try {
            logic.retrieveSubclassesFromClass(characterClassId)
                .then(setSubclasses)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        loadSubclasses()
    }, [stamp])

    return <section className='select-section'>
        {subclasses.map(subclass => <SelectSubclassComponent key={subclass.name} item={subclass}/>)}
    </section>
}

export default SubclassList