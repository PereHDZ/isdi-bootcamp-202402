import { useEffect, useState } from 'react'
import logic from '../logic'
import { useRace, useCharacterClass, useBackground, useHp, useStats, useProficiencies, useExpertises, useCantrips, useSpells, useInstrument, useDeity, useFightingstyle } from '../pages/Home'

function ConfirmCharacter ({ onRetrunClick }) {
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { background } = useBackground()
    const { hp } = useHp()
    const { stats } = useStats()
    const { proficiencies } = useProficiencies()
    const { expertises } = useExpertises()
    const { cantrips } = useCantrips()
    const { spells } = useSpells()
    const { instrument } = useInstrument()
    const { deity } = useDeity()
    const { fightingStyle } = useFightingstyle()

    const [parentRace, setParentRace] = useState(null)
    const [parentClass, setParentClass] = useState(null)

    const [cantripsData, setCantripsData] = useState([])
    const [spellsData, setSpellsData] = useState([])

    const [actions, setActions] = useState([])
    const [actionsData, setActionsData] = useState([])

    useEffect(() => {
        if (race.parent){
            try {
                logic.retrieveRace(race.parent)
                    .then(setParentRace)
            } catch (error) {
                alert(error)
            }
        }

        if (characterClass.parent){
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(setParentClass)
            } catch(error) {
                alert(error)
            }
        }

        if (cantrips.length > 0) {
            const fetchCantripsData = () => {
                Promise.all(
                    cantrips.map(cantripId => logic.retrieveCantrip(cantripId)
                        .then(objectCantrip => objectCantrip))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setCantripsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip:', error)
                    return null
                })
            }
            fetchCantripsData()
        }

        if (spells.length > 0) {
            const fetchSpellsData = () => {
                Promise.all(
                    spells.map(spellId => logic.retrieveSpell(spellId)
                        .then(objectSpell => objectSpell))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setSpellsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching cantrip:', error)
                    return null
                })
            }
            fetchSpellsData()
        }
    }, [])

    useEffect(() => {
        const newActions = [...actions]
        
        if (!!characterClass.parent && !!parentClass && !!parentClass.classActions){
            for (let i = 0; i < parentClass.classActions.length; i++){
                newActions.push(parentClass.classActions[i])
            }            
        }
        if (race.name.includes('Dragon')){
            newActions.push(race.features.draconicAncestry.raceAction)
        }
        if (!!characterClass.classActions){
            for (let i = 0; i < characterClass.classActions.length; i++){
                newActions.push(characterClass.classActions[i])
            }            
        }

        const filteredActions = newActions.filter((value, index) => newActions.indexOf(value) === index)

        setActions(filteredActions)
    }, [parentClass])

    useEffect(() => {
        const fetchActionsData = () => {
            Promise.all(
                actions.map(actionId => logic.retrieveAction(actionId)
                    .then(objectAction => objectAction))
            ).then(fetchedData => {
                const filteredData = fetchedData.filter(Boolean)
                setActionsData(filteredData)
            }).catch(error => {
                console.error('Error fetching action:', error)
                return null
            })
        }
        fetchActionsData()
    }, [actions])

    const handleReturnClick = () => {
        event.preventDefault()

        onRetrunClick()
    }

    console.log(actions)
    console.log(actionsData)

    const renderClassAndName = () => {
        return <div>
            <h2 className='no-margin-bottom'>{race.name} {parentClass ? `${parentClass.name}: ${characterClass.name}` : characterClass.name}</h2>
            <span>{`(${background.name})`}</span>

            <div  className='show-class-race'>
                <div className='display-row'>
                    <div className='main-attribute'>
                        <img src={parentRace ? `../../public/gallery/Race_Icons/Race_${parentRace.name}.png` : `../../public/gallery/Race_Icons/Race_${race.name}.png`} alt='race icon'/>
                    </div>

                    { parentRace ? <div className='child-attribute'>
                        <img src={`../../public/gallery/SubRaces_Icons/Race_${race.name}.png`}/>
                    </div> : <></>}
                </div>

                <div className='display-row'>
                    <div className='display-row'>
                        <img src={parentClass ? `../../public/gallery/Classes_Icons/Class_${parentClass.name}_Badge_Icon.png` : `../../public/gallery/Classes_Icons/Class_${characterClass.name}_Badge_Icon.png`} alt='race icon'/>
                    </div>

                    { parentClass ? <div>
                        <img src={`../../public/gallery/SubClasses_Icons/Class_${characterClass.name}_Badge_Icon.png`} className='small-size'/>
                    </div> : <></>}
                </div>
            </div>            
        </div>
    }

    const renderStats = () => {
        return <div className='final-stats-div'>
            {Object.keys(stats).map(stat => {
                return <div key={stat}>
                    <img src={`../../public/gallery/Stats_Icons/${stat}.png`} alt={stat} className='small-stat-icon'/>
                    <span>{stats[stat]}</span>
                </div>
            })}
        </div>
    }

    const renderProficiencies = () => {
        const armourAttributes = Object.keys(proficiencies.armour)
        const weaponsAttributes = Object.keys(proficiencies.weapons)
        const skillsAttributes = Object.keys(proficiencies.skills)

        const armourString = armourAttributes.join(', ')
        const weaponsString = weaponsAttributes.join(', ')
        const skillsString = skillsAttributes.join(', ')

        return <div>
            <div>
                <h4>YOUR ARMOUR PROFICIENCIES</h4>

                <p className='spell-p'>{armourString}</p>
            </div>

            <div>
                <h4>YOUR WEAPON PROFICIENCIES</h4>

                <p className='spell-p'>{weaponsString}</p>
            </div>

            <div>
                <h4>YOUR SKILL PROFICIENCIES</h4>

                <p className='spell-p'>{skillsString}</p>
            </div>
        </div>
    }

    const renderExpertises = () => {
        if (Object.keys(expertises).length > 0){
            const expertisesArray = Object.keys(expertises)

            const expertisesString = expertisesArray.join(', ')

            return <div>
                <h4>YOUR EXPERTISES</h4>

                <p className='spell-p'>{expertisesString}</p>
            </div>
        }         
    }

    const renderSpells = () => {
        let cantripsDiv = <></>
        let spellsDiv = <></>

        if (cantrips.length > 0 ){
            const cantripNames = cantripsData.map(cantrip => cantrip.name).join(', ')

            cantripsDiv = <div>
                <h4>YOUR CANTRIPS</h4>

                <p className='spell-p'>{cantripNames}</p>
            </div>
        }

        if (spells.length > 0 ){
            const spellNames = spellsData.map(spell => spell.name).join(', ')

            spellsDiv = <div>
                <h4>YOUR SPELLS</h4>

                <p className='spell-p'>{spellNames}</p>
            </div>
        }
        
        return <>{cantripsDiv}{spellsDiv}</>
    }

    const renderActions = () => {
        let actionsDiv = <></>

        if (actionsData.length > 0){
            const actionNames = actionsData.map(action => action.name).join(', ')

            actionsDiv = <div>
                <h4>YOUR ACTIONS</h4>

                <p className='spell-p'>{actionNames}</p>
            </div>
        }

        return actionsDiv
    }

    const renderOthers = () => {
        if (characterClass.name === 'Bard'){
            return <div>
                <h4>YOUR INSTRUMENT</h4>

                <p className='spell-p'>{instrument}</p>
            </div>
        }

        if (characterClass.name.includes('Domain')){
            return <div>
            <h4>YOUR DEITY</h4>

            <p className='spell-p'>{deity.name}</p>
        </div>
        }

        if (characterClass.name === 'Fighter'){
            return <div>
            <h4>YOUR FIGHTING STYLE</h4>

            <p className='spell-p'>{fightingStyle.name}</p>
        </div>
        }
    }

    return <div>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1>CONFIRM YOUR CHARACTER</h1>

        <form className='character-form'>
            { renderClassAndName() }

            <div>
                <h4><stron>HP: </stron>{hp}</h4>
            </div>

            <label htmlFor='name' className='name-label'>Write your character name</label>
            <input type='text' id='name' required></input>

            { renderStats() }

            { renderProficiencies() }

            { renderExpertises() }

            { renderSpells() }

            { renderActions() }

            { renderOthers() }

            <div className="select-button-div">
                <button className="select-button">CREATE</button>
            </div>
        </form>
    </div>
}

export default ConfirmCharacter