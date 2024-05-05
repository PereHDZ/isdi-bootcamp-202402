import { useBackgroundId } from '../pages/Home'

function SelectBackgroundComponent({ item: background }) {
    const {setBackgroundId} = useBackgroundId()
    const handleBackgroundClick = () => {
        setBackgroundId(background._id)
    }

    return <article className="select-atribute-article">
        <button className='select-atribute-button' onClick={handleBackgroundClick}>
            <img src={`../../public/gallery/Background_Icons/Background_${background.name}_Icon.png`} className='select-button-icon'></img>
        </button>
        <h3>{background.name}</h3>
    </article>
}

export default SelectBackgroundComponent