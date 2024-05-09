import { useEffect, useState } from 'react'
import { useRace, useCharacterClass, useStats } from '../pages/Home'
import logic from '../logic'

function AssignStats({ onReturnClick, onStatsSelected }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { setStats } = useStats()

    const [deities, setDeities] = useState([])
    const [deity, setDeity] = useState(null)

    const [fightingStyles, setFightingStyles] = useState([])
    const [fightingStyle, setFightingStyle] = useState(null)

    const [archetypes, setArchetypes] = useState([])
    const [archetype, setArchetype] = useState(null)

    const [naturalExplorers, setNaturalExplorers] = useState([])
    const [naturalExplorer, setNaturalExplorer] = useState(null)
    
    const [selectedStats, setSelectedStats] = useState({
        Strength: 8,
        Dexterity: 8,
        Constitution: 8,
        Intelligence: 8,
        Wisdom: 8,
        Charisma: 8,
    })
    
    const [minValues, setMinValues] = useState({
        Strength: 8,
        Dexterity: 8,
        Constitution: 8,
        Intelligence: 8,
        Wisdom: 8,
        Charisma: 8,
    })
    
    const [maxValues, setMaxValues] = useState({
        Strength: 15,
        Dexterity: 15,
        Constitution: 15,
        Intelligence: 15,
        Wisdom: 15,
        Charisma: 15,
    })

    const [remainingStatPoints, setRemainingStatPoints] = useState(27)

    const [plus2Modifier, setPlus2Modifier] = useState(null)
    const [plus1Modifier, setPlus1Modifier] = useState(null)

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const handleConfirmClick = () => {
        event.preventDefault()

        setStats(selectedStats)

        onStatsSelected()
    }

    useEffect(() => {
        if (characterClass.name.includes('Domain')){
            try {
                logic.retrieveDeities()
                    .then(retrievedDeities => {
                        const laduguer = retrievedDeities.find(deity => deity.name === 'Laduguer')
                        const vlaakith = retrievedDeities.find(deity => deity.name === 'Vlaakith')

                        const filteredDeities = retrievedDeities.filter(deity => deity.name !== 'Laduguer' &&  deity.name !== 'Vlaakith')

                        if (race.name === 'Duergar'){
                            filteredDeities.push(laduguer)

                            setDeities(filteredDeities)
                        } else if (race.name === 'Seldarine Drow'){
                            const seldarineDeities = filteredDeities.filter(deity => deity.name !== 'Lolth')

                            setDeities(seldarineDeities)
                        } else if (race.name === 'Githyanki'){
                            filteredDeities.push(vlaakith)

                            setDeities(filteredDeities)
                        } else {
                            setDeities(filteredDeities)
                        }
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }         
        }
    }, [])

    useEffect(() => {
        if (race.name === 'Lolth-Sworn Drow' && characterClass.name.includes('Domain')){
            const lolth = deities.find(deity => deity.name === 'Lolth')

            setDeity(lolth)
        }
    }, [])

    useEffect(() => {
        if (characterClass.name === 'Fighter'){
            try {
                logic.retrieveFightingStyles()
                    .then(setFightingStyles)
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    useEffect(() => {
        if (characterClass.name === 'Ranger'){
            try{
                logic.retrieveArchetypes()
                    .then(setArchetypes)
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    useEffect(() => {
        if (characterClass.name === 'Ranger'){
            try{
                logic.retrieveNaturalExplorers()
                    .then(newNaturalExplorers => {
                        setNaturalExplorers(newNaturalExplorers)
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    const handleStatIncrement = (stat) => {
        if (remainingStatPoints > 0 && selectedStats[stat] < maxValues[stat]){
            const updatedStats = { ...selectedStats }
            updatedStats[stat]++
            setSelectedStats(updatedStats)
            setRemainingStatPoints(remainingStatPoints - 1)
        }
    }

    const handleStatDecrement = (stat) => {
        if (remainingStatPoints < 27 && selectedStats[stat] > minValues[stat]){
            const updatedStats = { ...selectedStats }
            updatedStats[stat]--
            setSelectedStats(updatedStats)
            setRemainingStatPoints(remainingStatPoints + 1)
        }          
    }

    const handlePlusOneDropdownChange = (e, modifier) => {
        const selectedStat = e.target.value

        let originalStats = {         
            Strength: 8,
            Dexterity: 8,
            Constitution: 8,
            Intelligence: 8,
            Wisdom: 8,
            Charisma: 8 
        }
        if (!!plus2Modifier)
            originalStats[plus2Modifier] = originalStats[plus2Modifier] + 2

        const originalMinValues = { ...originalStats }

        const originalMaxValues = { 
            Strength: 15,
            Dexterity: 15,
            Constitution: 15,
            Intelligence: 15,
            Wisdom: 15,
            Charisma: 15  
        }
        if (!!plus2Modifier)
            originalMaxValues[plus2Modifier] = originalMaxValues[plus2Modifier] + 2

        if (modifier === 1 && selectedStat !== plus2Modifier) {
            setPlus1Modifier(selectedStat)

            const newStats = {...originalStats}
            newStats[selectedStat]++
            setSelectedStats(newStats)

            const newMinValues = {...originalMinValues}
            newMinValues[selectedStat]++
            setMinValues(newMinValues)

            const newMaxValues = {...originalMaxValues}
            newMaxValues[selectedStat]++
            setMaxValues(newMaxValues)

            setRemainingStatPoints(27)
        } else {
            alert("One single stat can't get both bonuses. Please, select two different stats")

            e.target.value = ''
        }
    }

    const handlePlusTwoDropdownChange = (e, modifier) => {
        const selectedStat = e.target.value

        let originalStats = {         
            Strength: 8,
            Dexterity: 8,
            Constitution: 8,
            Intelligence: 8,
            Wisdom: 8,
            Charisma: 8 
        }
        if (!!plus2Modifier)
            originalStats[plus2Modifier]++

        const originalMinValues = { ...originalStats }

        let originalMaxValues = { 
            Strength: 15,
            Dexterity: 15,
            Constitution: 15,
            Intelligence: 15,
            Wisdom: 15,
            Charisma: 15  
        }
        if (!!plus2Modifier)
            originalMaxValues[plus2Modifier]++

        if (modifier === 2 && selectedStat !== plus1Modifier) {
            setPlus2Modifier(selectedStat)

            const newStats = {...originalStats}
            newStats[selectedStat] = newStats[selectedStat] + 2
            setSelectedStats(newStats)

            const newMinValues = {...originalMinValues}
            newMinValues[selectedStat] = newMinValues[selectedStat] + 2
            setMinValues(newMinValues)

            const newMaxValues = {...originalMaxValues}
            newMaxValues[selectedStat] = newMaxValues[selectedStat] + 2
            setMaxValues(newMaxValues)

            setRemainingStatPoints(27)
        } else {
            alert("One single stat can't get both bonuses. Please, select two different stats")

            e.target.value = ''
        }
    }   

    const renderStatInput = (stat) => {
        return <div key={stat} className='stat-div'>
            <img src={`../../public/gallery/Stats_Icons/${stat}.png`} alt={`${stat}`} className='stats-icons'></img>
            <label htmlFor={stat} className='stat-label'>{stat}:</label>
            <div className='counter-div'>
                <button type='button' onClick={() => handleStatIncrement(stat)}>+</button>
                <span>{selectedStats[stat]}</span>
                <button type='button' onClick={() => handleStatDecrement(stat)}>- </button>
            </div>
        </div>
    }

    const renderDeity = () => {
        if (characterClass.name.includes('Domain') && !!deity){
            return <div>
                <h5 className='margin-left'>YOUR DEITY</h5>
                <div className='deity-info'>
                    <p><strong>{deity.name}: </strong>{deity.description}</p>
                </div>                
            </div>
        }
    }

    const renderFightingStyle = () => {
        if (characterClass.name === 'Fighter' && !!fightingStyle){
            return <div>
                <h5 className='margin-left'>YOUR FIGHTING STYLE</h5>
                <div className='deity-info'>
                    <p><strong>{fightingStyle.name}: </strong>{fightingStyle.description}</p>
                </div>                
            </div>
        }
    }

    const renderArchetype = () => {
        if (characterClass.name === 'Ranger' && !!archetype){
            return <div>
                <h5 className='margin-left'>YOUR ARCHETYPE</h5>
                <div className='deity-info'>
                    <p><strong>{archetype.name}: </strong>{archetype.description}</p>
                </div>
            </div>
        }
    }

    const renderNaturalExplorer = () => {
        if (characterClass.name === 'Ranger' && !!naturalExplorer){
            return <div>
                <h5 className='margin-left'>YOUR NATURAL EXPLORER</h5>
                <div className='deity-info'>
                    <p><strong>{naturalExplorer.name}: </strong>{naturalExplorer.description}</p>
                </div>
            </div>
        }
    }

    const handleDeityChange = (event) => {
        try {
            logic.retrieveDeity(event.target.value)
                .then(setDeity)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const handleFightingStyleChange = (event) => {
        try {
            logic.retrieveFightingStyle(event.target.value)
                .then(setFightingStyle)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const handleArchetypeChange = (event) => {
        try {
            logic.retrieveArchetype(event.target.value)
                .then(setArchetype)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const handleNaturalExplorerChange = (event) => {
        try {
            logic.retrieveNaturalExplorer(event.target.value)
                .then(setNaturalExplorer)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const renderSelectDeity = () => {
        if (characterClass.name.includes('Domain')){
            return <div className='margin-left'>
                <h5 className='deity-title'>SELECT YOUR DEITY</h5>
                <select value={deity} onChange={handleDeityChange}>
                    <option value={null}>Select Deity</option>
                    { deities.map(deity => {
                        return <option key={deity._id} value={deity._id}>{deity.name}</option>
                    })}
                </select>
            </div>
        } else {
            return <></>
        }
    } 

    const renderSelectFightingStyle = () => {
        if (characterClass.name === 'Fighter'){
            return <div className='margin-left'>
                <h5 className='deity-title'>SELECT YOUR FIGHTING STYLE</h5>
                <select value={fightingStyle} onChange={handleFightingStyleChange}>
                    <option value={null}>Select Fighting Style</option>
                    { fightingStyles.map(fightingStyle => {
                        return <option key={fightingStyle._id} value={fightingStyle._id}>{fightingStyle.name}</option>
                    })}
                </select>
            </div>
        } else {
            return <></>
        }
    } 

    const renderSelectArchetype = () => {
        if (characterClass.name === 'Ranger'){
            return <div className='margin-left'>
                <h5 className='deity-title'>SELECT YOUR FAVOURED ENEMY</h5>
                <select value={archetype} onChange={handleArchetypeChange}>
                    <option value={null}>Select Favoured Enemy</option>
                    { archetypes.map(archetype => {
                        return <option key={archetype._id} value={archetype._id}>{archetype.name}</option>
                    })}
                </select>
            </div>
        } else {
            return <></>
        }
    } 

    const renderSelectNaturalExplorer = () => {
        if (characterClass.name === 'Ranger'){
            return <div className='margin-left'>
                <h5 className='deity-title'>SELECT YOUR NATURAL EXPLORER</h5>
                <select value={naturalExplorer} onChange={handleNaturalExplorerChange}>
                    <option value={null}>Select Natural Explorer</option>
                    { naturalExplorers.map(naturalExplorer => {
                        return <option key={naturalExplorer._id} value={naturalExplorer._id}>{naturalExplorer.name}</option>
                    })}
                </select>
            </div>
        } else {
            return <></>
        }
    }

    const renderConfirmButton = () => {
        if (characterClass.name === 'Fighter'){
            if (remainingStatPoints === 0 && !!fightingStyle && !!plus1Modifier && plus2Modifier)
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
        } else if (characterClass.name.includes('Domain')){
            if (remainingStatPoints === 0 && !!deity && !!plus1Modifier && plus2Modifier)
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
        } else if (characterClass.name === 'Ranger'){
            if (remainingStatPoints === 0 && !!archetype && naturalExplorer && !!plus1Modifier && plus2Modifier)
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
        } else {
            if (remainingStatPoints === 0 && !!plus1Modifier && plus2Modifier)
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
        }
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>DISTRIBUTE YOUR STATS</h1>

        <div className='stats-form'>
            <div className='stats-div'>
                <div className='distribute-stats'>
                    <label>Assign +2</label>
                    <select onChange={(e) => handlePlusTwoDropdownChange(e, 2)}>
                        <option value="">Select Stat</option>
                        {Object.keys(selectedStats).map((stat) => (
                            <option key={stat} value={stat}>
                                {stat}
                            </option>
                        ))}
                    </select>

                    <label>Assign +1</label>
                    <select onChange={(e) => handlePlusOneDropdownChange(e, 1)}>
                        <option value="">Select Stat</option>
                        {Object.keys(selectedStats).map((stat) => (
                            <option key={stat} value={stat}>
                                {stat}
                            </option>
                        ))}
                    </select>

                    {Object.keys(selectedStats).map(renderStatInput)}

                    <p>Remaining Points: {remainingStatPoints}/27</p>
                </div>

                {/* <div className='distribute-skills'>
                    <h5>BASE SKILLS</h5>
                    
                    <div className='display-skills'>
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Acrobatics
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Animal Handling
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Arcana
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Athletics
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Deception
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>History
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Insight   
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Intimidation  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Investigation   
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Medicine  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Nature   
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Perception  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Persuasion  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Religion 
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Survival 
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Nature 
                        </div>         
                    </div>                    
                </div> */}
            </div>

            { renderSelectDeity() }

            { deity && renderDeity() }

            { renderSelectFightingStyle() } 

            { fightingStyle && renderFightingStyle()}           

            { renderSelectArchetype() }

            { archetype && renderArchetype() }

            { renderSelectNaturalExplorer() }

            { naturalExplorer && renderNaturalExplorer()}

            <div className='select-button-div'>
                { renderConfirmButton() }
            </div>
        </div>
    </section>
}

export default AssignStats