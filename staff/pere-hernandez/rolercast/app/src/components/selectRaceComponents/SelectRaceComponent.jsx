import { useRace } from "../../pages/Home"

function SelectRaceComponent({ item: race }) {
    const {setRace} = useRace()
    const handleRaceClick = () => {
        setRace(race)
    }  

    return <article className='select-atribute-article'>
        <button className='select-atribute-button' onClick={handleRaceClick}>
            <img src={`../../public/gallery/Race_Icons/Race_${race.name}.png`} className='select-button-icon'></img>
        </button>
        <h3>{race.name}</h3>
    </article>
}

export default SelectRaceComponent