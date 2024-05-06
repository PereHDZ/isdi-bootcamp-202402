import { useEffect, useState } from 'react'
import { useCharacterClassId } from '../pages/Home'
import logic from '../logic'

function AssignStats({ onReturnClick }){
    const { characterClass } = useCharacterClassId()

    let [minStrength, setMinStrength] = useState(8)
    let [minDexterity, setMinDexterity] = useState(8)
    let [minConstitution, setMinConstitution] = useState(8)
    let [minIntelligence, setMinIntelligence] = useState(8)
    let [minWisdom, setMinWisdom] = useState(8)
    let [minCharisma, setMinCharisma] = useState(8)

    let [maxStrength, setMaxStrength] = useState(15)
    let [maxDexterity, setMaxDexterity] = useState(15)
    let [maxConstitution, setMaxConstitution] = useState(15)
    let [maxIntelligence, setMaxIntelligence] = useState(15)
    let [maxWisdom, setMaxWisdom] = useState(15)
    let [maxCharisma, setMaxCharisma] = useState(15)

    let [strength, setStrength] = useState(minStrength)
    let [dexterity, setDexterity] = useState(minDexterity)
    let [constitution, setConstitution] = useState(minConstitution)
    let [intelligence, setIntelligence] = useState(minIntelligence)
    let [wisdom, setWisdom] = useState(minWisdom)
    let [charisma, setCharisma] = useState(minCharisma)

    let [statPoints, setStatPoints] = useState(27)

    const { characterClassId } = useCharacterClassId()

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    const renderSelectDeity = () => {
        if (characterClass.name.includes('Domain')){
            return <h3>SELECT YOUR DEITY</h3>
        } else {
            return <></>
        }
    }

    const increaseStrength = () => {
        useEffect(() => {
            if (statPoints > 0 && strength < maxStrength){
                setStrength(strength++)
    
                setStatPoints(statPoints--)
            } 
        }, [strength, statPoints])           
    }

    const increaseDexterity = () => {
        useEffect(() => {
            if (statPoints > 0 && dexterity < maxDexterity){
                setStrength(dexterity++)
    
                setStatPoints(statPoints--)
            } 
        }, [dexterity, statPoints])           
    }

    const increaseConstitution = () => {
        useEffect(() => {
            if (statPoints > 0 && constitution < maxConstitution){
                setStrength(constitution++)
    
                setStatPoints(statPoints--)
            } 
        }, [constitution, statPoints])           
    }

    const increaseIntelligence = () => {
        useEffect(() => {
            if (statPoints > 0 && intelligence < maxIntelligence){
                setStrength(intelligence++)
    
                setStatPoints(statPoints--)
            } 
        }, [intelligence, statPoints])           
    }

    const increaseWisdom = () => {
        useEffect(() => {
            if (statPoints > 0 && wisdom < maxWisdom){
                setStrength(wisdom++)
    
                setStatPoints(statPoints--)
            } 
        }, [wisdom, statPoints])           
    }

    const increaseCharisma = () => {
        useEffect(() => {
            if (statPoints > 0 && charisma < maxCharisma){
                setStrength(charisma++)
    
                setStatPoints(statPoints--)
            } 
        }, [charisma, statPoints])           
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
                    <div className='assign-bonus-skill'>
                        <label htmlFor="+2-skill" className='no-margin'>Assign +2 skill</label>

                        <select name="+2-skill" id="+2-skill">
                            <option value={null}>Select +2</option>
                            <option value="Strength">Strength</option>
                            <option value="Dexterity">Dexterity</option>
                            <option value="Constitution">Constitution</option>
                            <option value="Intelligence">Intelligence</option>
                            <option value="Wisdom">Wisdom</option>
                            <option value="Charisma">Charisma</option>
                        </select>
                    </div>

                    <div className='assign-bonus-skill'>
                        <label htmlFor="+1-skill" className='no-margin'>Assign +1 skill</label>

                        <select name="+1-skill" id="+1-skill">
                            <option value={null}>Select +1</option>
                            <option value="Strength">Strength</option>
                            <option value="Dexterity">Dexterity</option>
                            <option value="Constitution">Constitution</option>
                            <option value="Intelligence">Intelligence</option>
                            <option value="Wisdom">Wisdom</option>
                            <option value="Charisma">Charisma</option>
                        </select>
                    </div>   
                    
                    <h5>POINTS REMAINING {statPoints}/27</h5>

                    <div className='display-stats'>
                        <img src='../../public/gallery/Stats_Icons/Strength.png' alt='Strength' className='stats-icons'></img>

                        <span className='stat-span'>Strength</span>

                        <div className='counter-div'>
                            <button className='counter-button' onClick={increaseStrength}>+</button>
                            <span>{strength}</span>
                            <button className='counter-button'>-</button>
                        </div>                    
                    </div>

                    <div className='display-stats'>
                        <img src='../../public/gallery/Stats_Icons/Dexterity.png' alt='Dexterity' className='stats-icons'></img>

                        <span className='stat-span'>Dexterity</span>

                        <div className='counter-div'>
                            <button className='counter-button' onClick={increaseDexterity}>+</button>
                            <span>{dexterity}</span>
                            <button className='counter-button'>-</button>
                        </div>                    
                    </div>

                    <div className='display-stats'>
                        <img src='../../public/gallery/Stats_Icons/Constitution.png' alt='Constitution' className='stats-icons'></img>

                        <span className='stat-span'>Constitution</span>

                        <div className='counter-div'>
                            <button className='counter-button' onClick={increaseConstitution}>+</button>
                            <span>{constitution}</span>
                            <button className='counter-button'>-</button>
                        </div>                    
                    </div>

                    <div className='display-stats'>
                        <img src='../../public/gallery/Stats_Icons/Intelligence.png' alt='Intelligence' className='stats-icons'></img>

                        <span className='stat-span'>Intelligence</span>

                        <div className='counter-div'>
                            <button className='counter-button' onClick={increaseIntelligence}>+</button>
                            <span>{intelligence}</span>
                            <button className='counter-button'>-</button>
                        </div>                    
                    </div>

                    <div className='display-stats'>
                        <img src='../../public/gallery/Stats_Icons/Wisdom.png' alt='Wisdom' className='stats-icons'></img>

                        <span className='stat-span'>Wisdom</span>

                        <div className='counter-div'>
                            <button className='counter-button' onClick={increaseWisdom}>+</button>
                            <span>{wisdom}</span>
                            <button className='counter-button'>-</button>
                        </div>                    
                    </div>

                    <div className='display-stats'>
                        <img src='../../public/gallery/Stats_Icons/Charisma.png' alt='Charisma' className='stats-icons'></img>

                        <span className='stat-span'>Charisma</span>

                        <div className='counter-div'>
                            <button className='counter-button' onClick={increaseCharisma}>+</button>
                            <span>{charisma}</span>
                            <button className='counter-button'>-</button>
                        </div>                    
                    </div>                
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