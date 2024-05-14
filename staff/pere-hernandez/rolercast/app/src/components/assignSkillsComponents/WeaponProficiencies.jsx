function WeaponProficiencies ({ item: inheritedWeapons }) {
    if (inheritedWeapons.length > 0){
        const weaponsString = inheritedWeapons.join(', ')

        return <div>
            <p><strong>Weapon proficiencies inherited from race or class: </strong>{weaponsString}</p>
        </div>
    } else {
        return <></>
    }
}

export default WeaponProficiencies