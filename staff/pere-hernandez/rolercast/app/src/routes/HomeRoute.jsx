import CharacterList from "../components/CharacterList"

function HomeRoute({ onCreateClick }) {
    const handleCreateCharacterClick = () => onCreateClick()

    return <section>
        <CharacterList></CharacterList>
        
        <footer>
            <button className="footer-button" onClick={handleCreateCharacterClick}>
                <img src="../../public/icons/createCharacter.png" className="icon"></img>
                <p>Create character</p>
            </button>
        </footer>
    </section>
    

}

export default HomeRoute