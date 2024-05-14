import { useCharacterClass } from '../../pages/Home'

function ConfirmButton ({ item: [checkedSkills, skillPoints, checkedExpertises, expertisePoints], onConfirmClick }) {
    const { characterClass } = useCharacterClass()

    if (checkedSkills.length === skillPoints){
        if ((characterClass.name === 'Knowledge Domain' || characterClass.name === 'Rogue') && checkedExpertises.length < expertisePoints){
            return <></>
        } else {
            return <button className='select-button' onClick={onConfirmClick}>CONFIRM</button>
        }
    } else {
        return <></>
    }
}

export default ConfirmButton