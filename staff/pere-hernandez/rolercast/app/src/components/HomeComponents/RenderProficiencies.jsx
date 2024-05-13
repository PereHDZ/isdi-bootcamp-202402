function renderProficiencies ({ item: character }) {
    const armourAttributes = Object.keys(character.proficiencies.armour).filter(key => key !== '_id')
    const weaponsAttributes = Object.keys(character.proficiencies.weapons).filter(key => key !== '_id')
    const skillsAttributes = Object.keys(character.proficiencies.skills).filter(key => key !== '_id')

    const armourString = armourAttributes.join(', ')
    const weaponsString = weaponsAttributes.join(', ')
    const skillsString = skillsAttributes.join(', ')

    return <div>
        <div className='center'>
            <h4>YOUR ARMOUR PROFICIENCIES</h4>

            <p className='spell-p'>{armourString}</p>
        </div>

        <div className='center'>
            <h4>YOUR WEAPON PROFICIENCIES</h4>

            <p className='spell-p'>{weaponsString}</p>
        </div>

        <div className='center'>
            <h4>YOUR SKILL PROFICIENCIES</h4>

            <p className='spell-p'>{skillsString}</p>
        </div>
    </div>
}

export default renderProficiencies