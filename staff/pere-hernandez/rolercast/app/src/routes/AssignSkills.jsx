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

        

        console.log('weapons from race')
        console.log(newInheritedWeapons)
    
        console.log('armour from race')
        console.log(newInheritedArmour)
    
        console.log('skills from race')
        console.log(newInheritedskills)
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

        console.log('weapons from class')
        console.log(newInheritedWeapons)
    
        console.log('armour from class')
        console.log(newInheritedArmour)
    
        console.log('skills from class')
        console.log(newInheritedskills)
    }

    console.log('weapons')
    console.log(inheritedWeapons)

    console.log('armour')
    console.log(inheritedArmour)

    console.log('skills')
    console.log(inheritedSkills)

    return <h1>Hola</h1>
}

export default AssignSkills