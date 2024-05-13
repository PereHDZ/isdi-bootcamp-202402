import logic from '../../logic'

import { useEffect, useState } from 'react'

function RenderOthers ({ item: character }) {
    const [characterClass, setCharacterClass] = useState(null)
    const [deity, setDeity] = useState(null)
    const [fightingStyle, setFightingStyle] = useState(null)
    const [archetype, setArchetype] = useState(null)
    const [naturalExplorer, setNaturalExplorer] = useState(null)

    useEffect(() => {
        try {
            logic.retrieveCharacterClass(character.class)
                .then(setCharacterClass)
        } catch (error) {
            alert(error)
        }

        if (!!character.deity){
            try {
                logic.retrieveDeity(character.deity)
                    .then(setDeity)
            } catch (error) {
                alert (error)
            }
        }

        if (!!character.fightingStyle){
            try {
                logic.retrieveFightingStyle(character.fightingStyle)
                    .then(setFightingStyle)
            } catch (error) {
                alert (error)
            }
        }

        if (!!character.naturalExplorer){
            try {
                logic.retrieveNaturalExplorer(character.naturalExplorer)
                    .then(setNaturalExplorer)
            } catch (error) {
                alert (error)
            }
        }

        if (!!character.archetype){
            try {
                logic.retrieveArchetype(character.archetype)
                    .then(setArchetype)
            } catch (error) {
                alert (error)
            }
        }
    }, [])

    if (!!character.instrument){
        return <div className='center'>
            <h4>YOUR INSTRUMENT</h4>

            <p className='spell-p'>{character.instrument}</p>
        </div>
    }

    if (!!deity){
        return <div className='center'>
        <h4>YOUR DEITY</h4>

        <p className='spell-p'>{deity.name}</p>
    </div>
    }

    if (!!fightingStyle){
        return <div className='center'>
        <h4>YOUR FIGHTING STYLE</h4>

        <p className='spell-p'>{fightingStyle.name}</p>
    </div>
    }

    if (!!characterClass && characterClass.name === 'Ranger'){
        return <div className='center'>
            <h4>YOUR TYPE OF RANGER</h4>

            <p className='spell-p'><strong>Your Favoured Enemy: </strong>{!!archetype && archetype.name}</p>
            <p className='spell-p'><strong>Your Natural Explorer: </strong>{!!naturalExplorer && naturalExplorer
            .name}</p>
        </div>
    }
}

export default RenderOthers