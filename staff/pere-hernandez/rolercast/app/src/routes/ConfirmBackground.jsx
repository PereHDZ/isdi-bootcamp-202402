import { useBackgroundId } from '../pages/Home'
import { useState, useEffect } from 'react'

import logic from '../logic'

function ConfirmBackground({ onReturnClick }){
    const [background, setBackground] = useState(null)

    const { backgroundId } = useBackgroundId()

    useEffect(() => {
        if(!(backgroundId)) {
            onReturnClick()

            return
        }

        try {
            logic.retrieveBackground(backgroundId)
                .then(setBackground)
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
    </section>
}

export default ConfirmBackground