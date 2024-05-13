import logic from '../logic'

import { useState, useEffect } from 'react'
import CharacterArticle from './CharacterArticle'

function CharacterList() {
    const [characters, setCharacters] = useState([])

    const loadCharacters = () => {
        try {
            logic.retrieveCharacters()
                .then(setCharacters)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        loadCharacters()
    }, [])

    return <section className='character-list'>
        {characters.map(character => <CharacterArticle key={character.name} item={character}/>)}
    </section>
}

export default CharacterList