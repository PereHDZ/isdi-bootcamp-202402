import { useEffect, useState } from 'react'
import { useCharacterClassId } from '../pages/Home'
import retrieveCharacterClass from '../logic/retrieveCharacterClass'
import logic from '../logic'

function AssignStats({ onReturnClick }){
    const { characterClassId } = useCharacterClassId()
    const [ characterClass, setCharacterClass ] = useState(null)

    const [skills, setSkills] = useState({
        Strength: 8,
        Dexterity: 8,
        Constitution: 8,
        Intelligence: 8,
        Wisdom: 8,
        Charisma: 8,
    })

    const [remainingSkillPoints, setRemainingSkillPoints] = useState(27)

    const [plus2Modifier, setPlus2Modifier] = useState(null)
    const [plus1Modifier, setPlus1Modifier] = useState(null)

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    try {
        logic.retrieveCharacterClass(characterClassId)
            .then(setCharacterClass)
            .catch(error => alert(error))
    } catch (error) {
        alert(error)
    }

    const handleSkillIncrement = (skill) => {
        if (remainingSkillPoints > 0 && skills[skill] < 15){
            const updatedSkills = { ...skills }
            updatedSkills[skill]++
            setSkills(updatedSkills)
            setRemainingSkillPoints(remainingSkillPoints--)
        }
    }

    const handleSkillDecrement = (skill) => {
        if (remainingSkillPoints < 27 && skills[skill] > 8){
            const updatedSkills = { ...skills }
            updatedSkills[skill]--
            setSkills(updatedSkills)
            setRemainingSkillPoints(remainingSkillPoints++)
        }          
    }

    const handleDropdownChange = (e, modifier) => {
        const selectedSkill = e.target.value
        if (modifier === 1 && selectedSkill !== plus2Modifier) {
            setPlus1Modifier(selectedSkill)
        } else if (modifier === 2 && selectedSkill !== plus1Modifier) {
            setPlus2Modifier(selectedSkill)
        }
    }

    const renderSkillInput = (skill) => {
        return <div key={skill}>
            <label htmlFor={skill}>{skill}:</label>
            <button onClick={() => handleSkillDecrement(skill)}>-</button>
            <span>{skills[skill]}</span>
            <button onClick={() => handleSkillIncrement(skill)}>+</button>
        </div>
    }

    const renderSelectDeity = () => {
        if (characterClass.name.includes('Domain')){
            return <h3>SELECT YOUR DEITY</h3>
        } else {
            return <></>
        }
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>DISTRIBUTE YOUR STATS AND SKILLS</h1>

        <form className='stats-form'>
            <div className='stats-div'>
                <div className='distribute-stats'>
                    <label>Assign +2</label>
                    <select onChange={(e) => handleDropdownChange(e, 2)}>
                        <option value="">Select Skill</option>
                        {Object.keys(skills).map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>

                    <label>Assign +1</label>
                    <select onChange={(e) => handleDropdownChange(e, 1)}>
                        <option value="">Select Skill</option>
                        {Object.keys(skills).map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>

                    {Object.keys(skills).map(renderSkillInput)}

                    <p>Remaining Points: {remainingSkillPoints}/27</p>
                </div>

                <div className='distribute-skills'>
                    <h5>BASE SKILLS</h5>
                    
                    <div className='display-skills'>
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Acrobatics
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Animal Handling
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Arcana
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Athletics
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Deception
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>History
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Insight   
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Intimidation  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Investigation   
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Medicine  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Nature   
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Perception  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Persuasion  
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Religion 
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Survival 
                        </div>
                        
                        <div>
                            <input type="checkbox" name='skill' className='checkbox'/>Nature 
                        </div>         
                    </div>                    
                </div>
            </div>

            { characterClass && renderSelectDeity()}

            { characterClass && characterClass.name === 'Fighter' &&<h5>SELECT YOUR FIGHTING STYLE</h5>}            

            { characterClass && characterClass.name === 'Ranger' && <h5>SELECT YOR FAVOURED ENEMY</h5>}      

            { characterClass && characterClass.name === 'Ranger' && <h5>SELECT YOR NATURAL EXPLORER</h5>}      
        </form>
    </section>
}

export default AssignStats