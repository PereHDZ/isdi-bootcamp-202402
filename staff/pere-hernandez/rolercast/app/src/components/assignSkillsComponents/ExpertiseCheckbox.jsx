import { useCharacterClass } from '../../pages/Home'

function ExpertiseCheckbox ({ item: [expertisePoints, availableExpertises, checkedExpertises, bonuses, selectedExpertises, allSkills, setCheckedExpertises, setSelectedExpertises] }) {
    const { characterClass } = useCharacterClass()

    if (characterClass.name === 'Rogue' || characterClass.name === 'Knowledge Domain'){
        const handleExpertiseCheckboxChange = (event) => {
            const selectedExpertise = event.target.value
            let newCheckedExpertises = checkedExpertises
    
            if (event.target.checked){
                if (checkedExpertises.length < expertisePoints){
                    newCheckedExpertises = [...selectedExpertises, selectedExpertise]
    
                    setCheckedExpertises(newCheckedExpertises)
                    setSelectedExpertises([...selectedExpertises, selectedExpertise])
                } else {
                    event.target.checked = false
                    alert(`You can only select up to ${expertisePoints} expertise skills`)
                }
            } else {
                newCheckedExpertises = checkedExpertises.filter(expertise => expertise !== selectedExpertise)
    
                const newSelectedExpertises = selectedExpertises.filter(expertise => expertise !== selectedExpertise)
    
                setCheckedExpertises(newCheckedExpertises)
                setSelectedExpertises([...newSelectedExpertises])
            }
        }
    
        return (
            <div className='distribute-stats margins margin-top'>
                <span><strong>SELECT {expertisePoints} SKILLS TO SET AS EXPERTISE</strong></span>
    
                <div className='skills-div'>
                    {availableExpertises.map(expertise => (
                        <div className='align-center' key={expertise}>
                            <input
                                type='checkbox'
                                value={expertise}
                                className='check-box-input'
                                onChange={handleExpertiseCheckboxChange}
                                checked={checkedExpertises.includes(expertise)}
                            />
                            <label className='skill-check-label'>
                                {expertise} +{bonuses[allSkills.find(s => s.name === expertise).stat]}
                            </label>
                        </div>
                    ))}
                </div>
                
            </div>
        )
    }
    return <></>
}

export default ExpertiseCheckbox