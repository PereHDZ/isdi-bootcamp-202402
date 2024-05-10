import logic from '../logic'

import { useState, useEffect } from 'react'

import { useRace, useCharacterClass, useStats } from '../pages/Home'

function AssignSkills (){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()
    const { stats } = useStats()

    const [inheritedWeapons, setInheritedWeapons] = useState([])
    const [inheritedArmour, setInheritedArmour] = useState([])
    const [inheritedSkills, setInheritedSkills] = useState([])

    const [availableSkills, setAvailableSkills] = useState([])
    const [skillPoints, setSkillPoints] = useState(null)

    const allSkills = [
        { name:'acrobatics', stat: 'Dexterity' },
        { name: 'animalHandling', stat: 'Wisdom' },
        { name: 'arcana', stat: 'Intelligence' }, 
        { name: 'athletics', stat: 'Strength '}, 
        { name: 'deception', stat: 'Charisma' }, 
        { name: 'history', stat: 'Intelligence' },
        { name: 'insight', stat: 'Wisdom' }, 
        { name: 'intimidation', stat: 'Charisma' }, 
        { name: 'investigation', stat: 'Intelligence' },         , 
        { name: 'medicine', stat: 'Wisdom' }, 
        { name: 'nature', stat: 'Intelligence' }, 
        { name: 'perception', stat: 'Wisdom' }, 
        { name: 'performance', stat: 'Charisma' }, 
        { name: 'persuassion', stat: 'Charisma' }, 
        { name: 'religion', stat: 'Intelligence' }, 
        { name: 'sleightOfHand', stat: 'Dexterity' }, 
        { name: 'stealth', stat: 'Dexterity' }, 
        { name: 'survival', stat: 'Wisdom' }
    ]

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
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await inheritSkillPoints()
        }
        fetchData()
    }, [])

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

        if (!!raceWithProficiencies.proficiencies && !!raceWithProficiencies.proficiencies){
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

    const renderInheritedWeapons = () => {
        const p = inheritedWeapons.join(', ')
        return <div>
            <p><strong>Weapon proficiencies inherited from race or class: </strong>{p}</p>
        </div>
    }

    const renderInheritedArmour = () => {
        const p = inheritedArmour.join(', ')
        return <div>
            <p><strong>Armour proficiencies inherited from race or class: </strong>{p}</p>
        </div>
    }

    const renderInheritedSkills = () => {
        const p = inheritedSkills.join(', ')
        return <div>
            <p><strong>Skill proficiencies inherited from race: </strong>{p}</p>
        </div>
    }

    const renderBonuses = () => {
        return <div>
            <p><strong>Your stat bonuses: </strong>Str: +{bonuses.Strength}, Dex: +{bonuses.Dexterity}, Cons: +{bonuses.Constitution}, Int: +{bonuses.Intelligence}, Wis: +{bonuses.Wisdom}, Char: +{bonuses.Charisma}</p>
        </div>
    }

    console.log(bonuses)

    return <section>
        <div className="return-div">
            <button className="transparent-button">
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT YOUR PROFICIENCIES</h1>

        <div className='distribute-stats'>
            <span>SELECT {skillPoints} SKILLS</span>

            { renderBonuses() }
        </div>

        { inheritedWeapons.length > 0 && renderInheritedWeapons()}

        { inheritedArmour.length > 0 && renderInheritedArmour()}

        { inheritedSkills.length > 0 && renderInheritedSkills()}
    </section>
}

export default AssignSkills