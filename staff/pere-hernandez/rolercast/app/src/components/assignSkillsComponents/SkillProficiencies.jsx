function SkillProficiencies ({ item: inheritedSkill }) {
    if (inheritedSkill.length > 0){
        const weaponsString = inheritedSkill.join(', ')

        return <div>
            <p><strong>Skill proficiencies inherited from race or class: </strong>{weaponsString}</p>
        </div>
    } else {
        return <></>
    }
}

export default SkillProficiencies