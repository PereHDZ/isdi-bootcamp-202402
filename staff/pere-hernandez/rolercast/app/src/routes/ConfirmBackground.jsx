import { useBackground } from '../pages/Home'
import { useEffect } from 'react'

import ReturnButton from '../components/commonComponents/ReturnButton'
import BackgroundImage from '../components/confirmBackgroundComponents/BackgroundImage'
import BackgroundInfo from '../components/confirmBackgroundComponents/BackgroundInfo'
import SelectButton from '../components/commonComponents/SelectButton'

function ConfirmBackground({ onReturnClick, onBackgroundSelected }){
    const { background } = useBackground()

    useEffect(() => {
        if(!(background)) {
            onReturnClick()

            return
        }
    }, [])

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const handleSelectBackgroundClick = () => {
        event.preventDefault()

        onBackgroundSelected()
    }
    
    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <BackgroundImage item={background}/>

        <BackgroundInfo item={background}/>

        <SelectButton onSelectClick={handleSelectBackgroundClick}/>
    </section>
}

export default ConfirmBackground