function SubraceInfo({item: race}) {
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

    return <div className="display-info-div">
        <p className="display-info-p">{race.description}</p>
        
        <h3>RACIAL FEATURES</h3>

        { getSpeed() }

        { getProficiencies() }

        { getFeatures() }
    </div>
}

export default SubraceInfo