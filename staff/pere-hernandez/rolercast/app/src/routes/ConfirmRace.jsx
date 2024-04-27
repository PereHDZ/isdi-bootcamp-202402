import { useRaceId } from "../pages/Home"
import { useState, useEffect } from "react"

import logic from "../logic"

function ConfirmRace({ onReturnClick }){
    const [race, setRace] = useState(null)

    const {raceId} = useRaceId()

    useEffect(() => {
            /*if (!(raceId)) {
            onReturnClick()

            return
        } */
        
        try {
            logic.retrieveRace(raceId)
                .then(setRace)
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
            <div className="select-atribute-button">
                <img src={`../../public/gallery/Race_Icons/Race_${race && race.name}.png`} className="select-button-icon" />
            </div>

            <h2>{race && race.name}</h2>
        </div>

        <div className="display-info-div">
            <p className="display-info-p">{race && race.description}</p>
            
            <h3>RACIAL FEATURES</h3>
        </div>

        <div className="select-button-div">
            <button className="select-button">SELECT</button>
        </div>
        
    </section>
}

export default ConfirmRace