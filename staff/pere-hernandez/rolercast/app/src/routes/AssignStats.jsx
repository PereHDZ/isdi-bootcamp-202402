import { useCharacterClassId } from '../pages/Home'

function AssignStats({ onReturnClick }){
    const { characterClass } = useCharacterClassId()

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>DISTRIBUTE YOUR STATS AND SKILLS</h1>

        <div className='distribute-stats'>
            <img src='../../public/gallery/Stats_Icons/Strength.png' alt='Strength' className='stats-icons'></img>
            <img src='../../public/gallery/Stats_Icons/Dexterity.png' alt='Dexterity' className='stats-icons'></img>
            <img src='../../public/gallery/Stats_Icons/Constitution.png' alt='Constitution' className='stats-icons'></img>
            <img src='../../public/gallery/Stats_Icons/Intelligence.png' alt='Intelligence' className='stats-icons'></img>
            <img src='../../public/gallery/Stats_Icons/Wisdom.png' alt='Wisdom' className='stats-icons'></img>
            <img src='../../public/gallery/Stats_Icons/Charisma.png' alt='Charisma' className='stats-icons'></img>
        </div>
    </section>
}

export default AssignStats