import { useRaceId } from "../pages/Home"

function SelectRaceComponent({ item: race }) {
    const {setRaceId} = useRaceId()
    const handleRaceClick = () => {
        setRaceId(race._id)
    }  

    return <article className='select-atribute-article'>
        <button className='select-atribute-button' onClick={handleRaceClick}>
            <img src={`../../public/gallery/Race_Icons/Race_${race.name}.png`} className='select-button-icon'></img>
        </button>
        <h3>{race.name}</h3>
    </article>
}

export default SelectRaceComponent