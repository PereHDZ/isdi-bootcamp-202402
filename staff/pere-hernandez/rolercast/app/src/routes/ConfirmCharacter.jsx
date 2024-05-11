import { useEffect, useState } from 'react'
import logic from '../logic'
import { useRace, useCharacterClass, useBackground, useStats } from '../pages/Home'

function ConfirmCharacter ({ onRetrunClick }) {
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { background } = useBackground()
    const { stats } = useStats()

    const [parentRace, setParentRace] = useState(null)
    const [parentClass, setParentClass] = useState(null)

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
        </form>
    </div>
}

export default ConfirmCharacter