function ArmourProficiencies ({ item: inheritedArmour }) {
    if (inheritedArmour.length > 0){
        const weaponsString = inheritedArmour.join(', ')

        return <div>
            <p><strong>Armour proficiencies inherited from race or class: </strong>{weaponsString}</p>
        </div>
    } else {
        return <></>
    }
}

export default ArmourProficiencies