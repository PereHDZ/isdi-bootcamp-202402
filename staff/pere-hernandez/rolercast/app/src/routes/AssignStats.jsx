import logic from '../logic'

import { useEffect, useState } from 'react'

import { useRace, useCharacterClass, useStats, useHp, useSpells, useDeity, useFightingstyle, useArchetype, useNaturalExplorer, useInstrument } from '../pages/Home'

import DeityDropdown from '../components/assignStatsComponents/DeityDropdow'
import ChosenDeity from '../components/assignStatsComponents/ChosenDeity'
import FightingStyleDropdown from '../components/assignStatsComponents/FightingStyleDropdow'
import ChosenFightingStyle from '../components/assignStatsComponents/ChosenFightingStyle'
import ArchetypeDropdown from '../components/assignStatsComponents/ArchetypeDropdow'
import ChosenArchetype from '../components/assignStatsComponents/ChosenArchetype'
import NaturalExplorerDropdown from '../components/assignStatsComponents/NaturalExplorerDropdow'
import ChosenNaturalExplorer from '../components/assignStatsComponents/ChosenNaturalExplorer'
import InstrumentDropdown from '../components/assignStatsComponents/InstrumentDropdow'
import AncestorDropdown from '../components/assignStatsComponents/AncestorDropdown'
import SpellFromAncestor from '../components/assignStatsComponents/SpellFromAncestor'
import ConfirmButton from '../components/assignStatsComponents/ConfirmButton'

function AssignStats({ onReturnClick, onStatsSelected }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { hp, setHp } = useHp()
    const { spells, setSpells } = useSpells()
    const { setDeity } = useDeity()
    const { setFightingStyle } = useFightingstyle()
    const { setArchetype } = useArchetype()
    const { setNaturalExplorer } = useNaturalExplorer()
    const { setInstrument } = useInstrument()

    const [hpBonus, setHpBonus] = useState(null)

    const [chosenDeity, setChosenDeity] = useState(null)

    const [chosenFightingStyle, setChosenFightingStyle] = useState(null)

    const [chosenArchetype, setChosenArchetype] = useState(null)

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

            <DeityDropdown item={ [characterClass, race, chosenDeity, setChosenDeity] }/>

            <ChosenDeity item={[chosenDeity, characterClass]}/>

            <FightingStyleDropdown item={ [characterClass, chosenFightingStyle, setChosenFightingStyle] }/> 

            <ChosenFightingStyle item={ [characterClass, chosenFightingStyle] }/>         

            <ArchetypeDropdown item={ [characterClass, chosenArchetype, setChosenArchetype] }/>

            <ChosenArchetype item={ [characterClass, chosenArchetype] }/>

            <NaturalExplorerDropdown item={ [characterClass, chosenNaturalExplorer, setChosenNaturalExplorer] }/>

            <ChosenNaturalExplorer item={ [characterClass, chosenNaturalExplorer] }/>

            <InstrumentDropdown item={ [characterClass, setInstrument] }/>

            <AncestorDropdown item={ [characterClass, setSpells] }/>

            { spellsData.length > 0 && <SpellFromAncestor item={ [characterClass, spellsData] }/> }

            <div className='select-button-div'>
                <ConfirmButton 
                item={ [
                    remainingStatPoints, 
                    plus1Modifier, 
                    plus2Modifier, 
                    selectedStats,
                    chosenDeity, 
                    chosenFightingStyle, 
                    chosenArchetype, 
                    chosenNaturalExplorer]}
                onConfirmClick={onStatsSelected}/>
            </div>
        </div>
    </section>
}

export default AssignStats