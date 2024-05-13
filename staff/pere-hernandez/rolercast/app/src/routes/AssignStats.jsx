import { useEffect, useState } from 'react'
import { useRace, useCharacterClass, useStats, useHp, useSpells, useDeity, useFightingstyle, useArchetype, useNaturalExplorer, useInstrument } from '../pages/Home'
import logic from '../logic'

function AssignStats({ onReturnClick, onStatsSelected }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { setStats } = useStats()
    const { hp, setHp } = useHp()
    const { spells, setSpells } = useSpells()
    const { setDeity } = useDeity()
    const { setFightingStyle } = useFightingstyle()
    const { setArchetype } = useArchetype()
    const { setNaturalExplorer } = useNaturalExplorer()
    const { instrument, setInstrument } = useInstrument()

    const [hpBonus, setHpBonus] = useState(null)

    const [deities, setDeities] = useState([])
    const [chosenDeity, setChosenDeity] = useState(null)

    const [fightingStyles, setFightingStyles] = useState([])
    const [chosenFightingStyle, setChosenFightingStyle] = useState(null)

    const [archetypes, setArchetypes] = useState([])
    const [chosenArchetype, setChosenArchetype] = useState(null)

    const [naturalExplorers, setNaturalExplorers] = useState([])
    const [chosenNaturalExplorer, setChosenNaturalExplorer] = useState(null)

    const [spellsData, setSpellsData] = useState([])
    
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

        setInstrument(null)
        setDeity(null)
        setFightingStyle(null)
        setArchetype(null)
        setNaturalExplorer(null)

        onReturnClick()
    }

    const handleConfirmClick = () => {
        event.preventDefault()

        setStats(selectedStats)
        setDeity(chosenDeity)
        setFightingStyle(chosenFightingStyle)
        setArchetype(chosenArchetype)
        setNaturalExplorer(chosenNaturalExplorer)

        onStatsSelected()
    }

    useEffect(() => {
        let newHpBonus

        if(selectedStats.Constitution > 15){
            newHpBonus = 5
        } else if (selectedStats.Constitution > 13 && selectedStats.Constitution < 16){
            newHpBonus = 4
        } else if (selectedStats.Constitution > 11 && selectedStats.Constitution < 14){
            newHpBonus = 3
        } else if (selectedStats.Constitution > 9 && selectedStats.Constitution < 12){
            newHpBonus = 2
        } else {
            newHpBonus = 1
        }

        setHpBonus(newHpBonus)
    }, [selectedStats])

    useEffect(() => {
        if (!characterClass.parent){
            setHp(characterClass.hp + hpBonus)
        } else {
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(parentClass => {
                        setHp(parentClass.hp + hpBonus)
                    })
            } catch (error) {
                alert(error)
            }
        }
    }, [hpBonus])

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

            setChosenDeity(lolth)
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

    useEffect(() => {
        if (spells.length > 0){
            const fetchSpellsData = () => {
                Promise.all(
                    spells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell)
                    )
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching spell: ', error)
                    return null
                })
            }
            fetchSpellsData()
        }
    }, [spells])



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

            setSelectedStats(originalStats)

            setMinValues(originalMinValues)

            setMaxValues(originalMaxValues)

            setRemainingStatPoints(27)
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

            setSelectedStats(originalStats)

            setMinValues(originalMinValues)

            setMaxValues(originalMaxValues)
            
            setRemainingStatPoints(27)
        }
    }   

    const renderStatInput = (stat) => {
        return <div key={stat} className='stat-div'>
            <img src={`../../public/gallery/Stats_Icons/${stat}.png`} alt={stat}className='stats-icons'></img>
            <label htmlFor={stat} className='stat-label'>{stat}:</label>
            <div className='counter-div'>
                <button type='button' onClick={() => handleStatIncrement(stat)}>+</button>
                <span>{selectedStats[stat]}</span>
                <button type='button' onClick={() => handleStatDecrement(stat)}>- </button>
            </div>
        </div>
    }

    const renderDeity = () => {
        if (characterClass.name.includes('Domain') && !!chosenDeity){
            return <div>
                <h5 className='margin-left'>YOUR DEITY</h5>
                <div className='deity-info'>
                    <p><strong>{chosenDeity.name}: </strong>{chosenDeity.description}</p>
                </div>                
            </div>
        }
    }

    const renderFightingStyle = () => {
        if (characterClass.name === 'Fighter' && !!chosenFightingStyle){
            return <div>
                <h5 className='margin-left'>YOUR FIGHTING STYLE</h5>
                <div className='deity-info'>
                    <p><strong>{chosenFightingStyle.name}: </strong>{chosenFightingStyle.description}</p>
                </div>                
            </div>
        }
    }

    const renderArchetype = () => {
        if (characterClass.name === 'Ranger' && !!chosenArchetype){
            return <div>
                <h5 className='margin-left'>YOUR FAVOURED ENEMY</h5>
                <div className='deity-info'>
                    <p><strong>{chosenArchetype.name}: </strong>{chosenArchetype.description}</p>
                </div>
            </div>
        }
    }

    const renderNaturalExplorer = () => {
        if (characterClass.name === 'Ranger' && !!chosenNaturalExplorer){
            return <div>
                <h5 className='margin-left'>YOUR NATURAL EXPLORER</h5>
                <div className='deity-info'>
                    <p><strong>{chosenNaturalExplorer.name}: </strong>{chosenNaturalExplorer.description}</p>
                </div>
            </div>
        }
    }

    const renderSpellsData = () => {
        if (characterClass.name === 'Draconic Bloodline'){
            return <div>
                <h5 className='margin-left'>SPELL INHERITED FROM DRAGON ANCESTOR</h5>
                <div className='dety-info margin-left'>
                    <p><strong>{spellsData[0].name}: </strong>{spellsData[0].description}</p>
                </div>
            </div>
        }

    }

    const handleDeityChange = (event) => {
        try {
            logic.retrieveDeity(event.target.value)
                .then(setChosenDeity)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const handleFightingStyleChange = (event) => {
        try {
            logic.retrieveFightingStyle(event.target.value)
                .then(setChosenFightingStyle)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const handleArchetypeChange = (event) => {
        try {
            logic.retrieveArchetype(event.target.value)
                .then(setChosenArchetype)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const handleNaturalExplorerChange = (event) => {
        try {
            logic.retrieveNaturalExplorer(event.target.value)
                .then(setChosenNaturalExplorer)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    const handleInstrumentChange = (event) => {
        setInstrument(event.target.value)
    }

    const handleAncestorChange = (event) => {
        const newSpells = []

        newSpells.push(event.target.value)
        setSpells(newSpells)
    }

    const renderSelectDeity = () => {
        if (characterClass.name.includes('Domain')){
            return <div className='margin-left'>
                <h5 className='deity-title'>SELECT YOUR DEITY</h5>
                <select value={chosenDeity} onChange={handleDeityChange}>
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
                <select value={chosenFightingStyle} onChange={handleFightingStyleChange}>
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
                <select value={chosenArchetype} onChange={handleArchetypeChange}>
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
                <select value={chosenNaturalExplorer} onChange={handleNaturalExplorerChange}>
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

    const renderSelectInstrument = () => {
        if (characterClass.name === 'Bard'){
            return <div className='margin-left'>
                <h5 className='deity-title'>SELECT YOUR INSTRUMENT</h5>

                <select value={null} onChange={handleInstrumentChange}>
                    <option value={null}>Select Instrument</option>
                    <option value={'Hand Drum'}>Hand Drum</option>
                    <option value={'Flute'}>Flute</option>
                    <option value={'Lute'}>Lute</option>
                    <option value={'Lyre'}>Lyre</option>
                    <option value={'Violin'}>Violin</option>
                </select>
            </div>
        }
    }

    const renderSelectAncestor = () => {
        if (characterClass.name === 'Draconic Bloodline'){
            return <div className='margin-left'>
                <h5 className='deity title'>SELECT YOUR DRAGON ANCESTOR</h5>

                <select value={null} onChange={handleAncestorChange}>
                    <option value={null}>Select Ancestor</option>
                    <option value={'66335a87863710c59eae0f40'}>{'Red Dragon (Fire)'}</option>                    
                    <option value={'66335a87863710c59eae0f5a'}>{'Black Dragon (Acid)'}</option>                    
                    <option value={'66335a87863710c59eae0f75'}>{'Blue Dragon (Lightning)'}</option>                    
                    <option value={'66335a87863710c59eae0f3c'}>{'White Dragon (Cold)'}</option>                    
                    <option value={'66335a87863710c59eae0f6a'}>{'Green Dragon (Poison)'}</option>                    
                    <option value={'66335a87863710c59eae0f4e'}>{'Gold Dragon (Fire)'}</option>                    
                    <option value={'66335a87863710c59eae0f56'}>{'Silver Dragon (Cold)'}</option>                    
                    <option value={'66335a87863710c59eae0f58'}>{'Bronze Dragon (Lightning)'}</option>                    
                    <option value={'66335a87863710c59eae0f71'}>{'Copper Dragon (Acid)'}</option>                    
                    <option value={'66335a87863710c59eae0f6f'}>{'Brass Dragon (Fire)'}</option>                                       
                </select>
            </div>
        }
    }

    const renderConfirmButton = () => {
        if (characterClass.name === 'Fighter'){
            if (remainingStatPoints === 0 && !!chosenFightingStyle && !!plus1Modifier && plus2Modifier)
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
        } else if (characterClass.name.includes('Domain')){
            if (remainingStatPoints === 0 && !!chosenDeity && !!plus1Modifier && plus2Modifier)
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
        } else if (characterClass.name === 'Ranger'){
            if (remainingStatPoints === 0 && !!chosenArchetype && chosenNaturalExplorer && !!plus1Modifier && plus2Modifier)
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
        } else if (characterClass.name === 'Bard'){
            if (remainingStatPoints === 0 && !!instrument && !!plus1Modifier && plus2Modifier){
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
            }
        } else if (characterClass.name === 'Draconic Bloodline'){
            if (remainingStatPoints === 0 && !!spells.length > 0 && !!plus1Modifier && plus2Modifier){
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
            }
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

                    <div className='points'>
                        <p>Remaining Points: {remainingStatPoints}/27</p>

                        <p><strong>HP: </strong>{hp}</p>
                    </div>
                </div>
            </div>

            { renderSelectDeity() }

            { chosenDeity && renderDeity() }

            { renderSelectFightingStyle() } 

            { chosenFightingStyle && renderFightingStyle()}           

            { renderSelectArchetype() }

            { chosenArchetype && renderArchetype() }

            { renderSelectNaturalExplorer() }

            { chosenNaturalExplorer && renderNaturalExplorer()}

            { renderSelectInstrument() }

            { renderSelectAncestor() }

            { spellsData.length > 0 && renderSpellsData()}

            <div className='select-button-div'>
                { renderConfirmButton() }
            </div>
        </div>
    </section>
}

export default AssignStats