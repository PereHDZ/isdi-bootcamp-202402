import logic from '../../logic'

import { useEffect, useState } from 'react'

function RenderClassAndName ({ item: character}) {
    const [race, setRace] = useState(null)
    const [parentRace, setParentRace] = useState(null)

    const [characterClass, setCharacterClass] = useState(null)
    const [parentClass, setParentClass] = useState(null)

    const [background, setBackground] = useState(null)

    useEffect(() => {
        try {
            logic.retrieveRace(character.race)
                .then(setRace)
        } catch (error) {
            alert(error)
        }

        try {
            logic.retrieveCharacterClass(character.class)
                .then(setCharacterClass)
        } catch (error) {
            alert(error)
        }

        try {
            logic.retrieveBackground(character.background)
                .then(setBackground)
        } catch(error) {
            alert(error)
        }
    }, [])

    useEffect(() => {
        if (!!race && !!race.parent){
            try {
                logic.retrieveRace(race.parent)
                    .then(setParentRace)
            } catch (error){
                alert(error)
            }
        }

        if (!!characterClass && !!characterClass.parent){
            try{
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(setParentClass)
            } catch (error) {
                alert(error)
            }
        }
    }, [race, characterClass])


    return <div className='center'>
        <h2 className='no-margin-bottom'>{character.name}, the {!!race && race.name} {parentClass ? `${parentClass.name}: ${characterClass.name}` : !!characterClass && characterClass.name}</h2>
        <span>{`(${!!background && background.name})`}</span>

        <div  className='show-class-race'>
            <div className='display-row'>
                <div className='main-attribute'>
                    <img src={parentRace ? `../../public/gallery/Race_Icons/Race_${parentRace.name}.png` : `../../public/gallery/Race_Icons/Race_${!!race && race.name}.png`} alt='race icon'/>
                </div>

                { parentRace ? <div className='child-attribute'>
                    <img src={`../../public/gallery/SubRaces_Icons/Race_${race.name}.png`}/>
                </div> : <></>}
            </div>

            <div className='display-row'>
                <div className='display-row'>
                    <img src={parentClass ? `../../public/gallery/Classes_Icons/Class_${parentClass.name}_Badge_Icon.png` : `../../public/gallery/Classes_Icons/Class_${!!characterClass && characterClass.name}_Badge_Icon.png`} alt='race icon'/>
                </div>

                { parentClass ? <div>
                    <img src={`../../public/gallery/SubClasses_Icons/Class_${characterClass.name}_Badge_Icon.png`} className='small-size'/>
                </div> : <></>}
            </div>
        </div>

        <div>
            <h4 className='no-top'><strong>HP: </strong>{character.hp}</h4>
        </div>            
    </div>
}

export default RenderClassAndName