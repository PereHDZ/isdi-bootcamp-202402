import { useEffect, useState } from 'react'
import { useCharacter } from '../../pages/Home'
import logic from '../../logic'

function CharacterArticle({ item: character }) {
    const {setCharacter} = useCharacter()

    const [race, setRace] = useState(null)
    const [parentRace, setParentRace] = useState(null)

    const [characterClass, setCharacterClass] = useState(null)
    const [parentClass, setParentClass] = useState(null)

    const [background, setBackground] = useState(null)

    const [author, setAuthor] = useState(null)

    const handleCharacterClick = () => {
        setCharacter(character)
    }

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

        try {
            logic.retrieveUser(character.author)
                .then(setAuthor)
        } catch (error) {
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

    let raceImgSrc
    let characterImgSrc

    if (!!parentRace){
        raceImgSrc = `../../public/gallery/Race_Icons/Race_${parentRace.name}.png`
    } else if (!!race){
        raceImgSrc = `../../public/gallery/Race_Icons/Race_${race.name}.png`
    }

    if (!!parentClass){
        characterImgSrc = `../../public/gallery/Classes_Icons/Class_${parentClass.name}_Badge_Icon.png`
    } else if (!!characterClass){
        characterImgSrc = `../../public/gallery/Classes_Icons/Class_${characterClass.name}_Badge_Icon.png`
    }

    const renderClass = () => {
        if (!!characterClass && !parentClass){
            return `${characterClass.name}`
        } else if (!!characterClass){
            return `${parentClass.name}: ${characterClass.name}`
        }
    }

    return <div>
        <h2 className='no-bottom'>{character.name}</h2>
        <article className='character-article' onClick={handleCharacterClick}>
            <div className='center'>
                <img src={raceImgSrc}></img>
                <img src={characterImgSrc}></img>
            </div>

            <div className='article-info'>
                <p><strong>Author: </strong>{!!author && author.username}</p>

                <p><strong>Race: </strong>{!!race && race.name}</p>

                <p><strong>Class: </strong>{ renderClass() }</p>

                <p><strong>Background: </strong>{ !!background && background.name}</p>
            </div>
            
        </article>
    </div>
}

export default CharacterArticle