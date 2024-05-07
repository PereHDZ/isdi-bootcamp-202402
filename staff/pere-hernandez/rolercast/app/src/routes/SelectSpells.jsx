import logic from '../logic'

import { useRace, useCharacterClassId, useCantrips, useSpells } from '../pages/Home'
import { useEffect, useState } from 'react'

function SelectSpells({ onReturn }){
    const { race } = useRace()
    const { characterClassId } = useCharacterClassId()
    const { cantrips } = useCantrips()
    const { spells } = useSpells()

    const [cantripsSelected, setCantripsSelected] = useState([])
    const [cantripsData, setCantripsData] = useState([])
    const [spellsSelected, setSpellsSelected] = useState([])

    const handleReturnClick = () => onReturn()

    useEffect(() => {
        if (!!race && race.name.includes('Tiefling')){
            const newSelectedCantrips = [race.features.tieflingMagic.cantrip]
            setCantripsSelected(newSelectedCantrips)
        }
    }, [])

    useEffect(() => {
        if(!!race && race.name === 'Githyanki'){
            const newSelectedCantrips = [race.features.githyankiPsionics.cantrip]
            setCantripsSelected(newSelectedCantrips)
        }
    }, [])

    useEffect(() => {
        try {
            logic.retrieveRace(race.parent)
                .then(parentRace => {
                    if (parentRace.name === 'Drow'){
                        const newSelectedCantrips = [parentRace.features.drowMagic.cantrip]
                        setCantripsSelected(newSelectedCantrips)
                    }
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }            
    }, [])

    useEffect(() => {
        if(race.name === 'Drow Half-Elf'){
            const newSelectedCantrips = [race.features.drowMagic.cantrip]
            setCantripsSelected(newSelectedCantrips)
        }
    }, [])

    const renderSelectedCantrips = () => {
        useEffect(() => {
            const fetchCantripsData = () => {
                Promise.all(
                    cantripsSelected.map(cantripId => 
                        logic.retrieveCantrip(cantripId)
                            .then(objectCantrip => objectCantrip)
                            .catch(error => {
                                console.error('Error fetching cantrip:', error);
                                return null;
                            })
                    )
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean);
                    setCantripsData(filteredData);
                });
            };
    
            fetchCantripsData();
        }, [cantripsSelected]);
    
        return (
            <div>
                <h3>Selected Cantrips:</h3>

                <ul>
                    {cantripsData.map(cantrip => (
                        <li key={cantrip.id}><strong>{cantrip.name}: </strong>{cantrip.description}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h3>SELECT YOUR SPELLS</h3>

        { renderSelectedCantrips() }
    </section>
}

export default SelectSpells