import { useEffect, useState } from 'react'
import { useRace, useCharacterClass } from '../pages/Home'
import logic from '../logic'

function AssignStats({ onReturnClick }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const [deities, setDeities] = useState([])
    const [deity, setDeity] = useState(null)

    useEffect(() => {
        if (characterClass.name.includes('Domain')){
            try {
                logic.retrieveDeities()
                    .then(retrievedDeities => {
                        const laduguer = retrievedDeities.find(deity => deity.name === 'Laduguer')
                        console.log(laduguer)
                        const vlaakith = retrievedDeities.find(deity => deity.name === 'Vlaakith')
                        console.log(vlaakith)

                        const filteredDeities = retrievedDeities.filter(deity => deity.name !== 'Laduguer' &&  deity.name !== 'Vlaakith')

                        if (race.name === 'Duergar'){
                            filteredDeities.push(laduguer)

                            setDeities(filteredDeities)
                        } else if (race.name === 'Seldarine Drow'){
                            const seldarineDeities = filteredDeities.filter(deity => deity.name !== 'Lolth')

                            setDeities(seldarineDeities)
                        } else if (race.name === 'Githyanki'){
                            filteredDeities.push(vlaakith)

                            setDeities(filteredDeities)
                        } else {
                            setDeities(filteredDeities)
                        }
                    })
                    .catch(error => alert(error))
            } catch (error) {
                alert(error)
            }         
        }
    }, [])

    console.log(deities)

    useEffect(() => {
        if (race.name === 'Lolth-Sworn Drow' && characterClass.name.includes('Domain')){
            const lolth = deities.find(deity => deity.name === 'Lolth')

            setDeity(lolth)
        }
    })

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

    const handleSkillIncrement = (skill) => {
        if (remainingSkillPoints > 0 && skills[skill] < 15){
            const updatedSkills = { ...skills }
            updatedSkills[skill]++
            setSkills(updatedSkills)
            setRemainingSkillPoints(remainingSkillPoints - 1)
        }
    }

    const handleSkillDecrement = (skill) => {
        if (remainingSkillPoints < 27 && skills[skill] > 8){
            const updatedSkills = { ...skills }
            updatedSkills[skill]--
            setSkills(updatedSkills)
            setRemainingSkillPoints(remainingSkillPoints + 1)
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
        return <div key={skill} className='header-logo-div'>
            <img src={`../../public/gallery/Stats_Icons/${skill}.png`} alt={`${skill}`} className='stats-icons'></img>
            <label htmlFor={skill} className='stat-label'>{skill}:</label>
            <div className='counter-div'>
                <button type='button' onClick={() => handleSkillIncrement(skill)}>+</button>
                <span>{skills[skill]}</span>
                <button type='button' onClick={() => handleSkillDecrement(skill)}>- </button>
            </div>
        </div>
    }

    const renderDeity = () => {
        if (characterClass.name.includes('Domain') && !!deity){
            return <div>
                <h5>YOUR DEITY</h5>
                <div className='deity-info'>
                    <p><strong>{deity.name}: </strong>{deity.description}</p>
                </div>                
            </div>
        }
    }

    // const handleDeityChange = (event) => {
    //     setDeity(event.target.value)
    // }

    // const renderSelectDeity = () => {
    //     if (characterClass.name.includes('Domain')){
    //         try {
    //             logic.retrieveDeities()
    //                 .then(setDeities)
    //                 .then(() => {
    //                     return <div>
    //                         <label>SELECT YOUR DEITY</label>
    //                         <select value={deity} onChange={handleDeityChange}>
    //                             <option value={''}>Select Deity</option>
    //                             { deities && deities.map(deity => {
    //                                 return <option key={deity.name} value={deity}>{deity.name}</option>
    //                             })}
    //                         </select>
    //                     </div>
    //                 })
    //                 .catch(error => alert(error))
    //         } catch (error) {
    //             alert(error)
    //         }          
    //     } else {
    //         return <></>
    //     }
    // }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>DISTRIBUTE YOUR STATS AND SKILLS</h1>

        <div className='stats-form'>
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

            {/* { characterClass && renderSelectDeity() } */}

            { deity && renderDeity() }

            { characterClass && characterClass.name === 'Fighter' &&<h5>SELECT YOUR FIGHTING STYLE</h5>}            

            { characterClass && characterClass.name === 'Ranger' && <h5>SELECT YOR FAVOURED ENEMY</h5>}      

            { characterClass && characterClass.name === 'Ranger' && <h5>SELECT YOR NATURAL EXPLORER</h5>}  
        </div>
    </section>
}

export default AssignStats