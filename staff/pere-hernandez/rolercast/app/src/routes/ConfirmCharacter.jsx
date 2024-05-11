import { useEffect, useState } from 'react'
import logic from '../logic'
import { useRace, useCharacterClass } from '../pages/Home'

function ConfirmCharacter () {
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
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

    const renderClassAndName = () => {
        return <div>
            <h2>{race.name} {parentClass ? `${parentClass.name}: ${characterClass.name}` : characterClass.name}</h2>

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
    return <div>
        <h1>CONFIRM YOUR CHARACTER</h1>

        <form className='character-form'>
            { renderClassAndName() }
        </form>
    </div>
}

export default ConfirmCharacter