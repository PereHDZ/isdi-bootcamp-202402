import { useCharacterClassId } from '../pages/Home'

function AssignStats({ onReturnClick }){
    const { characterClass } = useCharacterClassId()

    const handleReturnClick = () => {
        event.preventDefault()

        onReturnClick()
    }

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>DISTRIBUTE YOUR STATS AND SKILLS</h1>

        <div className='display-row'>
            <div className='distribute-stats'>
                <h5>POINTS REMAINING 27/27</h5>

                <div className='display-row'>
                    <img src='../../public/gallery/Stats_Icons/Strength.png' alt='Strength' className='stats-icons'></img>

                    <div className='counter-div'>
                        <button className='counter-button'>+</button>
                        <span>8</span>
                        <button className='counter-button'>-</button>
                    </div>                    
                </div>

                <div className='display-row'>
                    <img src='../../public/gallery/Stats_Icons/Dexterity.png' alt='Dexterity' className='stats-icons'></img>

                    <div className='counter-div'>
                        <button className='counter-button'>+</button>
                        <span>8</span>
                        <button className='counter-button'>-</button>
                    </div>                    
                </div>

                <div className='display-row'>
                    <img src='../../public/gallery/Stats_Icons/Constitution.png' alt='Constitution' className='stats-icons'></img>

                    <div className='counter-div'>
                        <button className='counter-button'>+</button>
                        <span>8</span>
                        <button className='counter-button'>-</button>
                    </div>                    
                </div>

                <div className='display-row'>
                    <img src='../../public/gallery/Stats_Icons/Intelligence.png' alt='Intelligence' className='stats-icons'></img>

                    <div className='counter-div'>
                        <button className='counter-button'>+</button>
                        <span>8</span>
                        <button className='counter-button'>-</button>
                    </div>                    
                </div>

                <div className='display-row'>
                    <img src='../../public/gallery/Stats_Icons/Wisdom.png' alt='Wisdom' className='stats-icons'></img>

                    <div className='counter-div'>
                        <button className='counter-button'>+</button>
                        <span>8</span>
                        <button className='counter-button'>-</button>
                    </div>                    
                </div>

                <div className='display-row'>
                    <img src='../../public/gallery/Stats_Icons/Charisma.png' alt='Charisma' className='stats-icons'></img>

                    <div className='counter-div'>
                        <button className='counter-button'>+</button>
                        <span>8</span>
                        <button className='counter-button'>-</button>
                    </div>                    
                </div>                
            </div>

            <div className='distribute-skills'>
                <h5>BASE SKILLS</h5>
                <div className='display-skills'>
                    <div>
                        <button className='skill-button'></button>
                        <span>Acrobatics</span>
                    </div>

                    <div>
                        <button className='skill-button'></button>
                        <span>Animal Handling</span>
                    </div>

                    <div>
                        <button className='skill-button'></button>
                        <span>Arcana</span>
                    </div>

                    <div>
                        <button className='skill-button'></button>
                        <span>Athletics</span>
                    </div>

                    <div>
                        <button className='skill-button'></button>
                        <span>Deception</span>
                    </div>

                    <div>
                        <button className='skill-button'></button>
                        <span>History</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Insight</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Intimidation</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Investigation</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Medicine</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Nature</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Perception</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Performance</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Persuasion</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Religion</span>
                    </div>                    

                    <div>
                        <button className='skill-button'></button>
                        <span>Survival</span>
                    </div>                    
                </div>
                
            </div>
        </div>


    </section>
}

export default AssignStats