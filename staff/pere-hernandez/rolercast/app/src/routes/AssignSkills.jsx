import logic from '../logic'

import { useState, useEffect } from 'react'

import { useRace, useCharacterClass } from '../pages/Home'

function AssignSkills (){
    const { race } = useRace()
    const { characterClass } = useCharacterClass()

    const [inheritedWeapons, setInheritedWeapons] = useState([])
    const [inheritedArmour, setInheritedArmour] = useState([])
    const [inheritedSkills, setInheritedSkills] = useState([])

    const allSkills = ['acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'religion', 'sleightOfHand', 'stealth', 'survival']

    useEffect(() => {
        const fetchData = async () => {
            await inheritSkillsFromRace()
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await inheritSkillsFromClass()
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
        const newInheritedskills = [...inheritedSkills]

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

    return <section>
        <div className="return-div">
            <button className="transparent-button">
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT YOUR PROFICIENCIES</h1>

        <div className='distribute-stats'>Hola</div>

        { inheritedWeapons.length > 0 && renderInheritedWeapons()}

        { inheritedArmour.length > 0 && renderInheritedArmour()}

        { inheritedSkills.length > 0 && renderInheritedSkills()}
    </section>
}

export default AssignSkills