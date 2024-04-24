import { useRaceId } from "../pages/Home"
import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import logic from "../logic"

function ConfirmRace({ onReturnClick }){
    const [race, setRace] = useState(null)

    const {raceId} = useRaceId()

    const navigate = useNavigate()

    useEffect(() => {
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
            <h1 className="return">RETURN</h1>
        </div>

        <div className="select-atribute-article padding-bottom">
            <div className="select-atribute-button">
                <img src={`../../public/gallery/Race_Icons/Race_${race && race.name}.png`} className="select-button-icon" />
            </div>

            <h2>{race && race.name}</h2>
        </div>

        <div className="display-info-div">
            <p className="display-info-p">{race && race.description}</p>
        </div>

        <div className="select-button-div">
            <button className="select-button">SELECT</button>
        </div>
        
    </section>
}

export default ConfirmRace