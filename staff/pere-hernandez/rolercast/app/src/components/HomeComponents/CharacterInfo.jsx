import logic from '../../logic'

import { useEffect, useState } from 'react'

import { useCharacter } from '../../pages/Home'

import XButton from './XButton'
import RenderClassAndName from './RenderClassAndName'
import RenderStats from './RenderStats'
import RenderProficiencies from './RenderProficiencies'
import RenderExpertises from './RenderExpertises'
import RenderSpells from './RenderSpells'
import RenderActions from './RenderActions'
import RenderOthers from './RenderOthers'

function CharacterInfo() {
    const { character, setCharacter } = useCharacter()

    const [setAuthor] = useState(null)

    const handleXClick = () => {
        setCharacter(null)
    }

    useEffect(() => {
        try {
            logic.retrieveUser(character.author)
                .then(setAuthor)
        } catch (error) {
            alert(error)
        }
    }, [])

    return <section className='character-info-section'>
        <div className='character-info-div'>
            <XButton onXClicked={handleXClick}/>

            <RenderClassAndName item={character}/>
            
            <RenderStats item={character}/>

            <RenderProficiencies item={character}/>

            <RenderExpertises item={character}/>

            <RenderSpells item={character}/>

            <RenderActions item={character}/>

            <RenderOthers item={character}/>
        </div>
    </section>
}

export default CharacterInfo