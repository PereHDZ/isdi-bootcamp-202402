import { useRace } from "../../pages/Home"

function SelectSubraceComponent({ item: subrace }) {
    const {setRace} = useRace()
    const handleSubraceClick = () => {
        setRace(subrace)
    }  

    return <article className='select-atribute-article'>
        <button className='select-atribute-button' onClick={handleSubraceClick}>
            <img src={`../../public/gallery/SubRaces_Icons/Race_${subrace.name}.png`} className='select-button-icon'></img>
        </button>
        <h3>{subrace.name}</h3>
    </article>
}

export default SelectSubraceComponent