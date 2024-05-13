import { useRace } from '../pages/Home'
import { useEffect } from 'react'

import ReturnButton from '../components/commonComponents/ReturnButton'
import SubraceImage from '../components/confirmSubraceComponents/SubraceImage'
import SubraceInfo from '../components/confirmSubraceComponents/SubraceInfo'
import SelectButton from '../components/commonComponents/SelectButton'

function ConfrimSubrace({ onReturnClick, onSubraceSelected }){
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

    const handleSelectSubraceClick = () => {
        event.preventDefault()

        onSubraceSelected()
    }

    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <SubraceImage item={race}/>

        <SubraceInfo item={race}/>

        <SelectButton onSelectClick={handleSelectSubraceClick}/> 
    </section>
}

export default ConfrimSubrace