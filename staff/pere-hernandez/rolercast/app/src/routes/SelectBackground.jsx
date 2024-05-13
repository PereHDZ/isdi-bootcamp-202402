import BackgroundList from "../components/selectBackgroundComponents/BackgroundList"
import ReturnButton from "../components/commonComponents/ReturnButton"

function SelectBackground({ onReturn }){
    const handleReturnClick = () => onReturn()

    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <h1 className='home-title'>SELECT BACKGROUND</h1>

        <BackgroundList/>
    </section>
}

export default SelectBackground