import { useRace, useCharacterClass, useBackground } from '../../pages/Home'

function ClassAndNameInfo ({ item: [parentRace, parentClass]}) {
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { background } = useBackground()

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

export default ClassAndNameInfo