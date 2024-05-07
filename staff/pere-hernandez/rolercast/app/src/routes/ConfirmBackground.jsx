import { useBackground } from '../pages/Home'
import { useEffect } from 'react'

function ConfirmBackground({ onReturnClick, onBackgroundSelected }){
    const { background } = useBackground()

    useEffect(() => {
        if(!(background)) {
            onReturnClick()

            return
        }
    }, [])

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const handleSelectBackgroundClick = () => {
        event.preventDefault()

        onBackgroundSelected()
    }

    const getSkills = () => {
        let skills = []

        for (const skill in background.skills){
            if (skill !== '_id')
                skills.push(skill)
        }

        const p = skills.join(', ')

        return <p><strong>Gains proficiency in: </strong>{p}</p>
    }

    return <section>
            <div className="return-div">
                <button className="transparent-button" onClick={handleReturnClick}>
                    <img src="../../public/icons/return.png" className="icon"></img>
                </button>
                <h3 className="return">RETURN</h3>
            </div>

            <div className="select-atribute-article atribute-title full-width">
                <div className="select-atribute-button">
                    <img src={`../../public/gallery/Background_Icons/Background_${background && background.name}_Icon.png`} className="select-button-icon" />
                </div>

                <h2>{background && background.name}</h2>
            </div>

            <div className='display-info-div'>

                <p className='display-info-p'>{background && background.description}</p>

                {background && getSkills()}

            </div>

            <div className="select-button-div">
                <button className="select-button" onClick={handleSelectBackgroundClick}>SELECT</button>
            </div>
    </section>
}

export default ConfirmBackground