function HomeRoute({ onCreateClick }) {
    const handleCreateCharacterClick = () => onCreateClick()

    return <footer>
        <button className="footer-button" onClick={handleCreateCharacterClick}>
            <img src="../../public/icons/createCharacter.png" className="icon"></img>
            <p>Create character</p>
        </button>
    </footer>
}

export default HomeRoute