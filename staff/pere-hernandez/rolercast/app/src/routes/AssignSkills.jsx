import logic from '../logic'

import { useState, useEffect } from 'react'

import { useRace, useCharacterClass, useBackground, useStats, useProficiencies, useExpertises } from '../pages/Home'

import ReturnButton from '../components/commonComponents/ReturnButton'
import WeaponProficiencies from '../components/assignSkillsComponents/WeaponProficiencies'
import ArmourProficiencies from '../components/assignSkillsComponents/ArmourProficiencies'
import SkillProficiencies from '../components/assignSkillsComponents/SkillProficiencies'
import Expertises from '../components/assignSkillsComponents/Expertises'

function AssignSkills ({ onRetrunClick, onSkillsConfirmed }){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { background } = useBackground()
    const { stats } = useStats()
    const { setProficiencies } = useProficiencies()
    const { setExpertises } = useExpertises()

    const [inheritedWeapons, setInheritedWeapons] = useState([])
    const [inheritedArmour, setInheritedArmour] = useState([])
    const [inheritedSkills, setInheritedSkills] = useState([])

    const [inheritedExpertises, setInheritedExpertises] = useState([])

    const [availableSkills, setAvailableSkills] = useState([])
    const [skillPoints, setSkillPoints] = useState(null)

    const [availableExpertises, setAvailableExpertises] = useState([])

    const [checkedSkills, setCheckedSkills] = useState([])
    const [checkedExpertises, setCheckedExpertises] = useState([])

    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedExpertises, setSelectedExpertises] = useState([])

    const [totalProficiencies, setTotalProficiencies] = useState([])
    const [totalExpertises, setTotalExpertises] = useState([])

    const allSkills = [
        { name:'acrobatics', stat: 'Dexterity' },
        { name: 'animalHandling', stat: 'Wisdom' },
        { name: 'arcana', stat: 'Intelligence' }, 
        { name: 'athletics', stat: 'Strength'}, 
        { name: 'deception', stat: 'Charisma' }, 
        { name: 'history', stat: 'Intelligence' },
        { name: 'insight', stat: 'Wisdom' }, 
        { name: 'intimidation', stat: 'Charisma' }, 
        { name: 'investigation', stat: 'Intelligence' },
        { name: 'medicine', stat: 'Wisdom' }, 
        { name: 'nature', stat: 'Intelligence' }, 
        { name: 'perception', stat: 'Wisdom' }, 
        { name: 'performance', stat: 'Charisma' }, 
        { name: 'persuasion', stat: 'Charisma' }, 
        { name: 'religion', stat: 'Intelligence' }, 
        { name: 'sleightOfHand', stat: 'Dexterity' }, 
        { name: 'stealth', stat: 'Dexterity' }, 
        { name: 'survival', stat: 'Wisdom' }
    ]

    const expertisePoints = 2

    const bonuses = {}

    for (const stat in stats){
        const value = stats[stat]

        if (value > 15){
            bonuses[stat] = 5
        } else if (value > 13 && value < 16){
            bonuses[stat] = 4
        } else if (value > 11 && value < 14){
            bonuses[stat] = 3
        } else if (value > 9 && value < 12){
            bonuses[stat] = 2
        } else {
            bonuses[stat] = 1
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await inheritSkillsFromRace()
            await inheritSkillsFromClass()
            inheritSkillsFromBackground()
            await inheritSkillPoints()
            await inheritAvailableSkills()
        }
        fetchData()

        inheritExpertises()
    }, [])

    useEffect(() => {
        inheritAvailableExpertises()
    }, [totalProficiencies])

    useEffect(() => {
        setTotalProficiencies([...inheritedSkills, ...selectedSkills])
    }, [inheritedSkills, selectedSkills])

    useEffect(() => {
        setTotalExpertises([...inheritedExpertises, ...selectedExpertises])
    }, [inheritedExpertises, selectedExpertises])

    const handleReturnClick = () => {
        event.preventDefault()

        onRetrunClick()
    }

    const handleConfirmClick = () => {
        event.preventDefault()

        const armourObject = inheritedArmour.reduce((accumulator, armour) => {
            accumulator[armour] = 1
            return accumulator
        }, {})
        
        const weaponsObject = inheritedWeapons.reduce((accumulator, weapon) => {
            accumulator[weapon] = 1
            return accumulator
        }, {})

        const proficienciesObject = totalProficiencies.reduce((accumulator, proficiency) => {
            accumulator[proficiency] = 1
            return accumulator
        }, {})

        const expertisesObject = totalExpertises.reduce((accumulator, expertise) => {
            accumulator[expertise] = 2
            return accumulator
        }, {})

        const newProficiencies = { armour: armourObject, weapons: weaponsObject, skills: proficienciesObject }
        const newExpertises = expertisesObject

        setProficiencies(newProficiencies)
        setExpertises(newExpertises)

        onSkillsConfirmed()
    }

    const inheritSkillsFromRace = async () => {
        let raceWithProficiencies

        const newInheritedWeapons = [...inheritedWeapons]
        const newInheritedArmour = [...inheritedArmour]
        const newInheritedskills = [...inheritedSkills]

        if (!race.parent){
            raceWithProficiencies = race
        } else {
            try {
                const parentRace = await logic.retrieveRace(race.parent)
                raceWithProficiencies = parentRace
            } catch (error) {
                alert(error)
            }
        }

        if (!!raceWithProficiencies.proficiencies && !!raceWithProficiencies.proficiencies.weapons){           
            for (const weapon in raceWithProficiencies.proficiencies.weapons){
                if (weapon !== '_id'){
                    newInheritedWeapons.push(weapon)

                    setInheritedWeapons(newInheritedWeapons)
                }
            }
        }

        if (!!raceWithProficiencies.proficiencies && !!raceWithProficiencies.proficiencies.armour){
            for (const armour in raceWithProficiencies.proficiencies.armour){
                if (armour !== '_id'){
                    newInheritedArmour.push(armour)

                    setInheritedArmour(newInheritedArmour)
                }
            }
        }

        if (!!raceWithProficiencies.proficiencies && !!raceWithProficiencies.proficiencies.skills){
            for (const skill in raceWithProficiencies.proficiencies.skills){
                if (raceWithProficiencies.proficiencies.skills[skill] === 1){
                    newInheritedskills.push(skill)

                    setInheritedSkills(newInheritedskills)
                }
            }
        }

        if (race.name.includes('Wood')){
            newInheritedskills.push('perception')

            setInheritedSkills(newInheritedskills)
        }

        if (race.name === 'Shield Dwarf'){
            newInheritedArmour.push('lightArmour', 'mediumArmour')

            setInheritedArmour(newInheritedArmour)
        }
    }

    const inheritSkillsFromClass = async () => {
        let classWithProficiencies

        const newInheritedWeapons = [...inheritedWeapons]
        const newInheritedArmour = [...inheritedArmour]

        if (!characterClass.parent){
            classWithProficiencies = characterClass
        } else {
            try {
                const parentClass = await logic.retrieveCharacterClass(characterClass.parent)
                classWithProficiencies = parentClass
            } catch (error) {
                alert(error)
            }
        }

        if (!!classWithProficiencies.proficiencies && !!classWithProficiencies.proficiencies.weapons){           
            for (const weapon in classWithProficiencies.proficiencies.weapons){
                if (weapon !== '_id'){
                    newInheritedWeapons.push(weapon)

                    setInheritedWeapons(newInheritedWeapons)
                }
            }
        }

        if (!!classWithProficiencies.proficiencies && !!classWithProficiencies.proficiencies.armour){
            for (const armour in classWithProficiencies.proficiencies.armour){
                if (armour !== '_id'){
                    newInheritedArmour.push(armour)

                    setInheritedArmour(newInheritedArmour)
                }
            }
        }

        if (characterClass.name === 'War Domain'){
            for (const weapon in characterClass.proficiencies.weapons){
                if (weapon !== '_id'){
                    newInheritedWeapons.push(weapon)

                    setInheritedWeapons(newInheritedWeapons)
                }
            }
        }

        if (characterClass.name === 'Life Domain' || characterClass.name === 'Nature Domain' || characterClass.name === 'Tempest Domain' || characterClass.name === 'War Domain') {
            newInheritedArmour.push('heavyArmour')

            setInheritedArmour(newInheritedArmour)
        }
    }

    const inheritSkillsFromBackground = () => {
        const newInheritedskills = [...inheritedSkills]

        for (const skill in background.skills)
            if (skill !== '_id'){
                newInheritedskills.push(skill)

                setInheritedSkills(newInheritedskills)
            }
    }

    const inheritSkillPoints = async () => {
        let classWithPoints
        let newSkillPoints

        if (!characterClass.parent){
            classWithPoints = characterClass
        } else {
            try {
                const parentClass = await logic.retrieveCharacterClass(characterClass.parent)
                classWithPoints = parentClass
            } catch (error) {
                alert(error)
            }
        }

        newSkillPoints = classWithPoints.skillCount

        if (characterClass.name === 'Nature Domain')
            newSkillPoints++

        if (race.name === 'Human')
            newSkillPoints++
        
        setSkillPoints(newSkillPoints)
    }

    const inheritExpertises = () => {
        const newInheritedExpertises = []
        if (race.name === 'Rock Gnome'){
            newInheritedExpertises.push('history')

            setInheritedExpertises(newInheritedExpertises)
        }

        if (characterClass.name === 'Knowledge Domain'){
            newInheritedExpertises.push('arcana', 'history', 'nature', 'religion')

            setInheritedExpertises(newInheritedExpertises)
        }
    } 

    const inheritAvailableSkills = async () => {
        let classWithSkills
        const newAvailableSkills = []

        if (!characterClass.parent) {
            classWithSkills = characterClass
        } else {
            try {
                const parentClass = await logic.retrieveCharacterClass(characterClass.parent) 
                classWithSkills = parentClass
            } catch (error) {
                alert (error)
            }
        }

        if (!!classWithSkills.proficiencies && !!classWithSkills.proficiencies.skills){
            for (const skill in classWithSkills.proficiencies.skills){
                if (classWithSkills.proficiencies.skills[skill] === 0){
                    newAvailableSkills.push(skill)

                    setAvailableSkills(newAvailableSkills)
                }
            }
        }

        if (characterClass.name === 'Nature Domain'){
            newAvailableSkills.push('animalHandling', 'nature', 'survival')

            setAvailableSkills(newAvailableSkills)
        }
    }

    const inheritAvailableExpertises = async () => {
        let newAvailableExpertises = []

        if (characterClass.name === 'Knowledge Domain'){
            newAvailableExpertises.push('arcana', 'history', 'nature', 'religion')

            setAvailableExpertises(newAvailableExpertises)
        } else if (characterClass.name === 'Rogue'){
            newAvailableExpertises = [...totalProficiencies]

            setAvailableExpertises(newAvailableExpertises)
        }
    }

    const renderBonuses = () => {
        return <div>
            <p><strong>Your stat bonuses: </strong>Str: +{bonuses.Strength}, Dex: +{bonuses.Dexterity}, Cons: +{bonuses.Constitution}, Int: +{bonuses.Intelligence}, Wis: +{bonuses.Wisdom}, Char: +{bonuses.Charisma}</p>
        </div>
    }

    const renderAvailableSkills = () => {
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


    const renderAvailableExpertises = () => {
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

    const renderConfirmButton = () => {
        if (checkedSkills.length === skillPoints){
            if ((characterClass.name === 'Knowledge Domain' || characterClass.name === 'Rogue') && checkedExpertises.length < expertisePoints){
                return <></>
            } else {
                return <button className='select-button' onClick={handleConfirmClick}>CONFIRM</button>
            }
        } else {
            return <></>
        }
    }

    return <section>
        <ReturnButton onReturnClicked={handleReturnClick}/>

        <h1 className='home-title'>SELECT YOUR PROFICIENCIES</h1>

        <div className='stats-form'>
            <div className='stats-div'>
                <div className='distribute-stats margins'>
                    <span><strong>SELECT {skillPoints} SKILLS</strong></span>

                    { renderBonuses() }

                    { renderAvailableSkills() }
                </div>
            </div>
            
            <div className='stats-div'>
                { availableExpertises.length > 0 && renderAvailableExpertises() }   
            </div>            
        </div>

        <div className='margins'>
            <WeaponProficiencies item={inheritedWeapons}/>

            <ArmourProficiencies item={inheritedArmour}/>

            <SkillProficiencies item={inheritedSkills}/>

            <Expertises item={inheritedExpertises}/>
        </div>

        <div className='select-button-div'>
            { renderConfirmButton() }
        </div>
    </section>
}

export default AssignSkills