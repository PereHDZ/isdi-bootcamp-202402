import logic from '../../logic'

import { useEffect, useState } from 'react'

function RenderSpells ({item: character}) {
    const [cantripsData, setCantripsData] = useState([])
    const [spellsData, setSpellsData] = useState([])

    useEffect(() => {
        if (!!character.cantrips){
            const fetchedCantripsData = () => {
                Promise.all(
                    character.cantrips.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setCantripsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip: ', error)
                    return null
                })
            }
            fetchedCantripsData()
        }

        if (!!character.spells){
            const fetchedSpellsData = () => {
                Promise.all(
                    character.spells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching spell: ', error)
                    return null
                })
            }
            fetchedSpellsData()
        }
    }, [])
    
    let cantripsDiv = <></>
    let spellsDiv = <></>

    if (cantripsData.length > 0 ){
        const cantripNames = cantripsData.map(cantrip => cantrip.name).join(', ')

        cantripsDiv = <div className='center'>
            <h4>YOUR CANTRIPS</h4>

            <p className='spell-p'>{cantripNames}</p>
        </div>
    }

    if (spellsData.length > 0 ){
        const spellNames = spellsData.map(spell => spell.name).join(', ')

        spellsDiv = <div className='center'>
            <h4>YOUR SPELLS</h4>

            <p className='spell-p'>{spellNames}</p>
        </div>
    }
    
    return <>{cantripsDiv}{spellsDiv}</>
}

export default RenderSpells