import { useRace } from '../pages/Home'
import { useEffect } from 'react'

import ReturnButton from '../components/commonComponents/ReturnButton'
import RaceImage from '../components/confirmRaceComponents/RaceImage'

function ConfirmRace({ onReturnClick, onRaceSelected }){
    const { race } = useRace()

    useEffect(() => {
        if (!(race)) {
            onReturnClick()

            return
        }
    }, [])

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const handleSelectRaceClick = () => {
        event.preventDefault()

        onRaceSelected()
    }

    const getSpeed = () => {
        if (!!race.speed){
            return <div className="display-row">
                <p><strong>Racial BaseSpeed: </strong>{race.speed}m</p>
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
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <RaceImage item={race}/>

        <article className="display-info-div">

            <p className="display-info-p">{race && race.description}</p>
            
            <h3>RACIAL FEATURES</h3>

            { race && getSpeed() }

            { race && getProficiencies() }

            { race && getFeatures() }
            
        </article>

        <div className="select-button-div">
            <button className="select-button" onClick={handleSelectRaceClick}>SELECT</button>
        </div>
        
    </section>
}

export default ConfirmRace