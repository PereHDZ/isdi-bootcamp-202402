import CharacterClassList from "../components/CharacterClassList"

function SelectCharacterClass({ onReturn }){
    const handleReturnClick = () => onReturn()

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT CLASS</h1>

        <CharacterClassList />
    </section>
}

export default SelectCharacterClass