import { useRace } from '../pages/Home'
import { useEffect } from 'react'

import ReturnButton from '../components/commonComponents/ReturnButton'
import RaceImage from '../components/confirmRaceComponents/RaceImage'
import RaceInfo from '../components/confirmRaceComponents/RaceInfo'
import SelectButton from '../components/commonComponents/SelectButton'

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

    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <RaceImage item={race}/>

        <RaceInfo item={race}/>

        <SelectButton onSelectClick={handleSelectRaceClick}/>        
    </section>
}

export default ConfirmRace