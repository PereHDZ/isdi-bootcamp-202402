function ProficienciesCheckbox ({ item: [skillPoints, availableSkills, checkedSkills, bonuses, selectedSkills, allSkills, setCheckedSkills, setSelectedSkills] }) {
    const handleCheckboxChange = (event) => {
        const selectedSkill = event.target.value
        let newCheckedSkills = checkedSkills

        if (event.target.checked){
            if (checkedSkills.length < skillPoints){
                newCheckedSkills = [...selectedSkills, selectedSkill]

                setCheckedSkills(newCheckedSkills)
                setSelectedSkills([...selectedSkills, selectedSkill])
            } else {
                event.target.checked = false
                alert(`You can only select up to ${skillPoints} skills`)
            }
        } else {
            newCheckedSkills = checkedSkills.filter(skill => skill !== selectedSkill)

            const newSelectedSkills = selectedSkills.filter(skill => skill !== selectedSkill)

            setCheckedSkills(newCheckedSkills)
            setSelectedSkills([...newSelectedSkills])
        }
    }

    return (
        <div className='skills-div'>
            {availableSkills.map(skill => (
                <div className='align-center' key={skill}>
                    <input
                        type='checkbox'
                        value={skill}
                        className='check-box-input'
                        onChange={handleCheckboxChange}
                        checked={checkedSkills.includes(skill)}
                    />
                    <label className='skill-check-label'>
                        {skill} +{bonuses[allSkills.find(s => s.name === skill).stat]}
                        </label>
                </div>
            ))}
        </div>
    )
}

export default ProficienciesCheckbox