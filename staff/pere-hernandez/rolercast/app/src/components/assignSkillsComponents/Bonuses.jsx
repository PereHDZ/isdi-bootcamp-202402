function Bonuses ({ item: bonuses }){
    return <div>
        <p><strong>Your stat bonuses: </strong>Str: +{bonuses.Strength}, Dex: +{bonuses.Dexterity}, Cons: +{bonuses.Constitution}, Int: +{bonuses.Intelligence}, Wis: +{bonuses.Wisdom}, Char: +{bonuses.Charisma}</p>
    </div>
}

export default Bonuses