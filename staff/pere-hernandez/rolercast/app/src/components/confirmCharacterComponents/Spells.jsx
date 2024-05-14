import logic from '../../logic'

import { useEffect, useState } from 'react'

import { useRace, useCharacterClass, useCantrips, useSpells } from '../../pages/Home'

function Spells ({ item: [setParentRace, setParentClass] }) {
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { cantrips } = useCantrips()
    const { spells } = useSpells()

    const [cantripsData, setCantripsData] = useState([])
    const [spellsData, setSpellsData] = useState([])

    let cantripsDiv = <></>
    let spellsDiv = <></>

    useEffect(() => {
        if (race.parent){
            try {
                logic.retrieveRace(race.parent)
                    .then(setParentRace)
            } catch (error) {
                alert(error)
            }
        }

        if (characterClass.parent){
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(setParentClass)
            } catch(error) {
                alert(error)
            }
        }

        if (cantrips.length > 0) {
            const fetchCantripsData = () => {
                Promise.all(
                    cantrips.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setCantripsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip:', error)
                    return null
                })
            }
            fetchCantripsData()
        }

        if (spells.length > 0) {
            const fetchSpellsData = () => {
                Promise.all(
                    spells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip:', error)
                    return null
                })
            }
            fetchSpellsData()
        }
    }, [])

    if (cantrips.length > 0 ){
        const cantripNames = cantripsData.map(cantrip => cantrip.name).join(', ')

        cantripsDiv = <div>
            <h4>YOUR CANTRIPS</h4>

            <p className='spell-p'>{cantripNames}</p>
        </div>
    }

    if (spells.length > 0 ){
        const spellNames = spellsData.map(spell => spell.name).join(', ')

        spellsDiv = <div>
            <h4>YOUR SPELLS</h4>

            <p className='spell-p'>{spellNames}</p>
        </div>
    }
    
    return <>{cantripsDiv}{spellsDiv}</>
}

export default Spells