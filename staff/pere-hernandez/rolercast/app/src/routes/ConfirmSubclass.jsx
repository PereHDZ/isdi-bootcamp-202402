import { useCharacterClass, useSpells, useActions } from '../pages/Home'
import { useEffect } from 'react'

import ReturnButton from '../components/commonComponents/ReturnButton'
import SubclassImage from '../components/confirmSubclassComponents/SubclassImage'
import SubclassInfo from '../components/confirmSubclassComponents/SubclassInfo'
import SelectButton from '../components/commonComponents/SelectButton'

function ConfirmSubclass({ onReturnClick, onSubclassSelected }){
    const { characterClass } = useCharacterClass()
    const { setSpells } = useSpells()

    useEffect(() => {
        if (!(characterClass)) {
            onReturnClick()

            return
        }

        if (!!characterClass.knownSpells){
            setSpells(characterClass.knownSpells)
        }
    }, [])

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const handleSelectSubclassClick = () => {
        event.preventDefault()

        onSubclassSelected()
    }

    return <section>
    <ReturnButton onReturnClicked={handleReturnClick}/>

    <SubclassImage item={characterClass}/>

    <SubclassInfo item={characterClass}/>

    <SelectButton onSelectClick={handleSelectSubclassClick}/> 
</section>
}

export default ConfirmSubclass