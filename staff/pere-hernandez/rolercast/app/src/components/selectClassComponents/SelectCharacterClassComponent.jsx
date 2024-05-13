import { useCharacterClass } from '../../pages/Home'

function SelectCharacterClassComponent({ item: characterClass }) {
    const {setCharacterClass} = useCharacterClass()
    const handleCharacterClassClick = () => {
        setCharacterClass(characterClass)
    }

    return <article className='select-atribute-article'>
        <button className='transparent-button' onClick={handleCharacterClassClick}>
            <img src={`../../public/gallery/Classes_Icons/Class_${characterClass.name}_Badge_Icon.png`} className='select-button-icon'></img>
        </button>
        <h3>{characterClass.name}</h3>
    </article>
}

export default SelectCharacterClassComponent