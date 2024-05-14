function SpellFromAncestor ({ item: [ characterClass, spellsData] }) {
    if (characterClass.name === 'Draconic Bloodline'){
        return <div>
            <h5 className='margin-left'>SPELL INHERITED FROM DRAGON ANCESTOR</h5>
            <div className='dety-info margin-left'>
                <p><strong>{spellsData[0].name}: </strong>{spellsData[0].description}</p>
            </div>
        </div>
    }
}

export default SpellFromAncestor