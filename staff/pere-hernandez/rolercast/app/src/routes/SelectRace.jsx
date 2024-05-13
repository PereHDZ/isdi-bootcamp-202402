import ReturnButton from '../components/commonComponents/ReturnButton'
import RaceList from '../components/selectRaceComponents/RaceList'

function SelectRace({ onReturn }){
    const handleReturnClick = () => onReturn()

    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <h1 className='home-title'>SELECT YOUR RACE</h1>

        <RaceList/>
    </section>
}

export default SelectRace