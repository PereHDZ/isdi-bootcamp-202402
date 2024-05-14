import logic from '../logic'

import { useEffect, useState } from 'react'

import { useRace, useCharacterClass, useSpells, useDeity, useFightingstyle, useArchetype, useNaturalExplorer, useInstrument } from '../pages/Home'

import ReturnButton from '../components/commonComponents/ReturnButton'
import StatsDistributor from '../components/assignStatsComponents/StatsDistributor'
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
    const { spells, setSpells } = useSpells()
    const { setDeity } = useDeity()
    const { setFightingStyle } = useFightingstyle()
    const { setArchetype } = useArchetype()
    const { setNaturalExplorer } = useNaturalExplorer()
    const { setInstrument } = useInstrument()

    const [chosenDeity, setChosenDeity] = useState(null)

    const [chosenFightingStyle, setChosenFightingStyle] = useState(null)

    const [chosenArchetype, setChosenArchetype] = useState(null)

    const [chosenNaturalExplorer, setChosenNaturalExplorer] = useState(null)

    const [spellsData, setSpellsData] = useState([])

    const [remainingStatPoints, setRemainingStatPoints] = useState(27)

    const [plus2Modifier, setPlus2Modifier] = useState(null)
    const [plus1Modifier, setPlus1Modifier] = useState(null)

    const [selectedStats, setSelectedStats] = useState({
        Strength: 8,
        Dexterity: 8,
        Constitution: 8,
        Intelligence: 8,
        Wisdom: 8,
        Charisma: 8,
    })

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

    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <h1 className='home-title'>DISTRIBUTE YOUR STATS</h1>

        <div className='stats-form'>
            <StatsDistributor item={ [
                plus2Modifier, 
                plus1Modifier, 
                setPlus2Modifier, 
                setPlus1Modifier, 
                selectedStats, 
                remainingStatPoints, 
                setSelectedStats, setRemainingStatPoints] }/>

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