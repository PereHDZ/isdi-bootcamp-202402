import { useCharacterClass, useSpells, useInstrument,  useStats, useDeity, useFightingstyle, useArchetype, useNaturalExplorer } from '../../pages/Home'

function ConfirmButton ({ 
    item: [
        remainingStatPoints, 
        plus1Modifier, 
        plus2Modifier, 
        selectedStats, 
        chosenDeity, 
        chosenFightingStyle, 
        chosenArchetype, 
        chosenNaturalExplorer], 
    onConfirmClick }) {
        
    const { characterClass } = useCharacterClass()
    const { spells } = useSpells()
    const { instrument } = useInstrument()
    const { setStats } = useStats()
    const { setDeity } = useDeity()
    const { setFightingStyle } = useFightingstyle()
    const { setArchetype } = useArchetype()
    const { setNaturalExplorer } = useNaturalExplorer()

    const handleConfirmClick = () => {
        event.preventDefault()

        setStats(selectedStats)
        setDeity(chosenDeity)
        setFightingStyle(chosenFightingStyle)
        setArchetype(chosenArchetype)
        setNaturalExplorer(chosenNaturalExplorer)

        onConfirmClick()
    }

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

export default ConfirmButton