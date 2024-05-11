import { useEffect, useState } from 'react'
import logic from '../logic'
import { useRace, useCharacterClass, useBackground, useStats, useCantrips, useSpells } from '../pages/Home'

function ConfirmCharacter ({ onRetrunClick }) {
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { background } = useBackground()
    const { stats } = useStats()
    const { cantrips } = useCantrips()
    const { spells } = useSpells()

    const [parentRace, setParentRace] = useState(null)
    const [parentClass, setParentClass] = useState(null)

    const [cantripsData, setCantripsData] = useState([])
    const [spellsData, setSpellsData] = useState([])

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

    const handleReturnClick = () => {
        event.preventDefault()

        onRetrunClick()
    }

    const renderClassAndName = () => {
        return <div>
            <h2 className='no-margin-bottom'>{race.name} {parentClass ? `${parentClass.name}: ${characterClass.name}` : characterClass.name}</h2>
            <span>{`(${background.name})`}</span>

            <div  className='show-class-race'>
                <div className='display-row'>
                    <div className='main-attribute'>
                        <img src={parentRace ? `../../public/gallery/Race_Icons/Race_${parentRace.name}.png` : `../../public/gallery/Race_Icons/Race_${race.name}.png`} alt='race icon'/>
                    </div>

                    { parentRace ? <div className='child-attribute'>
                        <img src={`../../public/gallery/SubRaces_Icons/Race_${race.name}.png`}/>
                    </div> : <></>}
                </div>

                <div className='display-row'>
                    <div className='display-row'>
                        <img src={parentClass ? `../../public/gallery/Classes_Icons/Class_${parentClass.name}_Badge_Icon.png` : `../../public/gallery/Classes_Icons/Class_${characterClass.name}_Badge_Icon.png`} alt='race icon'/>
                    </div>

                    { parentClass ? <div>
                        <img src={`../../public/gallery/SubClasses_Icons/Class_${characterClass.name}_Badge_Icon.png`} className='small-size'/>
                    </div> : <></>}
                </div>
            </div>            
        </div>
    }

    const renderStats = () => {
        return <div className='final-stats-div'>
            {Object.keys(stats).map(stat => {
                return <div key={stat}>
                    <img src={`../../public/gallery/Stats_Icons/${stat}.png`} alt={stat} className='small-stat-icon'/>
                    <span>{stats[stat]}</span>
                </div>
            })}
        </div>
    }

    const renderSpells = () => {
        let cantripsDiv = <></>
        let spellsDiv = <></>

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

    return <div>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1>CONFIRM YOUR CHARACTER</h1>

        <form className='character-form'>
            { renderClassAndName() }

            <label htmlFor='name' className='name-label'>Write your character name</label>
            <input type='text' id='name'></input>

            { renderStats() }

            { renderSpells() }
        </form>
    </div>
}

export default ConfirmCharacter