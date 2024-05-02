import { useCharacterClassId } from '../pages/Home'
import { useState, useEffect } from 'react'

import logic from '../logic'

function ConfirmCharacterClass({ onReturnClick, onCharacterClassSelected }){
    const [characterClass, setCharacterClass] = useState(null)

    const { characterClassId } = useCharacterClassId()

    useEffect(() => {
        if (!(characterClassId)) {
            onReturnClick()

            return
        }

        try {
            logic.retrieveCharacterClass(characterClassId)
                .then(setCharacterClass)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }, [])

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

        <div className="select-atribute-article atribute-title full-width">
            <div className="transparent-button">
                <img src={`../../public/gallery/Classes_Icons/Class_${characterClass && characterClass.name}_Badge_Icon.png`} className="select-button-icon" />
            </div>

            <h2 className='confirm-class-h2'>{characterClass && characterClass.name}</h2>
        </div>

        <div className='display-info-div'>
            <p className='display-info-p'>{characterClass && characterClass.description}</p>

            <h3>CLASS FEATURES</h3>

            <p><strong>HP: </strong> {characterClass && characterClass.hp} + Constitution Modifier</p>

        </div>
    </section>
}

export default ConfirmCharacterClass