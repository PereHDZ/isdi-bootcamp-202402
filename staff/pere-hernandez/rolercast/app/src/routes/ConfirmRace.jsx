import { useRaceId } from "../pages/Home"
import { useState, useEffect } from "react"

import logic from "../logic"

function ConfirmRace({ onReturnClick }){
    const [race, setRace] = useState(null)

    const { raceId } = useRaceId()

    useEffect(() => {
            if (!(raceId)) {
            onReturnClick()

            return
        }
        
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

    const getSpeed = () => {
        if (!!race.speed){
            return <div className="display-row">
                <p className="bold">Racial BaseSpeed:</p>
                <p className="margin-left">{race.speed}m</p>
            </div>
        }

        return <></>
    }

    const getProficiencies = () => {
        let proficienciesObjects = []
        let proficienciesArray = []

        if (!!race.proficiencies){
            for (const proficiency in race.proficiencies){
                if (proficiency !== '_id')
                    proficienciesObjects.push(race.proficiencies[proficiency])
            }
            
            for (let i = 0; i < proficienciesObjects.length; i++){
                for (const key in proficienciesObjects[i]){
                    if (key !== '_id')
                        proficienciesArray.push(key)
                }
            }

            const p = proficienciesArray.join(', ')

            return <p><strong>Proficiencies: </strong>{p}</p>
        }
        return <></>
    }

    const getFeatures = () => {
        let featuresArray = []

        if (!!race.features){
            for(const feature in race.features){
                if (feature !== '_id')
                    featuresArray.push(race.features[feature])
            }

            return featuresArray.map(feature => {
                return <div className="display-row">
                    <p><strong>{feature.name}: </strong>{feature.bonusesDescription} </p>
                </div>                
            })
        }

        return <></>
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

            { race && getSpeed() }

            <p>{ race && getProficiencies() }</p>

            <p>{ race && getFeatures() }</p>
        </div>

        <div className="select-button-div">
            <button className="select-button">SELECT</button>
        </div>
        
    </section>
}

export default ConfirmRace