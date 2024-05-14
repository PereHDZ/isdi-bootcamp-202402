import { useProficiencies } from '../../pages/Home'

function Proficiencies () {
    const { proficiencies } = useProficiencies()

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

export default Proficiencies