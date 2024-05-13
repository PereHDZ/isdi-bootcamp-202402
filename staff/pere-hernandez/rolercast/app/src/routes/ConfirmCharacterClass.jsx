import { useCharacterClass } from '../pages/Home'
import { useEffect, useState } from 'react'

import ReturnButton from '../components/commonComponents/ReturnButton'
import ClassImage from '../components/confirmClassComponents/ClassImage'
import ClassInfo from '../components/confirmClassComponents/ClassInfo'
import SelectButton from '../components/commonComponents/SelectButton'

function ConfirmCharacterClass({ onReturnClick, onCharacterClassSelected }){
    const { characterClass } = useCharacterClass()

    useEffect(() => {
        if (!(characterClass)) {
            onReturnClick()

            return
        }
    }, [])

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const handleSelectClassClick = () => {
        event.preventDefault()

        onCharacterClassSelected()
    }

    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <ClassImage item={characterClass}/>

        <ClassInfo item={characterClass}/>

        <SelectButton onSelectClick={handleSelectClassClick}/>
    </section>
}

export default ConfirmCharacterClass