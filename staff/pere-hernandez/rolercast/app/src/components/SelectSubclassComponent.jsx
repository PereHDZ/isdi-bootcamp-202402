import { useCharacterClassId } from '../pages/Home'

function SelectSubclassComponent( { item: subclass }){
    const {setCharacterClassId} = useCharacterClassId()
    const handleSubclassClick = () => {
        setCharacterClassId(subclass._id)
    }

    return <article className='select-atribute-article'>
    <button className='transparent-button' onClick={handleSubclassClick}>
        <img src={`../../public/gallery/SubClasses_Icons/Class_${subclass.name}_Badge_Icon.png`} className='select-button-icon'></img>
    </button>
    <h3>{subclass.name}</h3>
</article>
}

export default SelectSubclassComponent