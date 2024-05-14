import logic from '../../logic'

import { useState, useEffect } from 'react'

import { useCharacterClass, useStats, useHp } from '../../pages/Home'

function StatsDistributor ({ item: [
    plus2Modifier, 
    plus1Modifier, 
    setPlus2Modifier, 
    setPlus1Modifier, 
    selectedStats, 
    remainingStatPoints, 
    setSelectedStats, 
    setRemainingStatPoints] }) {
    const { characterClass } = useCharacterClass()
    const { hp, setHp } = useHp()

    const [hpBonus, setHpBonus] = useState(null)
    
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

    return <div className='stats-div'>
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
}

export default StatsDistributor