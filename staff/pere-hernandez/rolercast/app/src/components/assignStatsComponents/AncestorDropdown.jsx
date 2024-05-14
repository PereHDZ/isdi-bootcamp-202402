function AncestorDropdown ({ item: [characterClass, setSpells]}) {
    const handleAncestorChange = (event) => {
        const newSpells = []

        newSpells.push(event.target.value)
        setSpells(newSpells)
    }

    if (characterClass.name === 'Draconic Bloodline'){
        return <div className='margin-left'>
            <h5 className='deity title'>SELECT YOUR DRAGON ANCESTOR</h5>

            <select value={null} onChange={handleAncestorChange}>
                <option value={null}>Select Ancestor</option>
                <option value={'66335a87863710c59eae0f40'}>{'Red Dragon (Fire)'}</option>                    
                <option value={'66335a87863710c59eae0f5a'}>{'Black Dragon (Acid)'}</option>                    
                <option value={'66335a87863710c59eae0f75'}>{'Blue Dragon (Lightning)'}</option>                    
                <option value={'66335a87863710c59eae0f3c'}>{'White Dragon (Cold)'}</option>                    
                <option value={'66335a87863710c59eae0f6a'}>{'Green Dragon (Poison)'}</option>                    
                <option value={'66335a87863710c59eae0f4e'}>{'Gold Dragon (Fire)'}</option>                    
                <option value={'66335a87863710c59eae0f56'}>{'Silver Dragon (Cold)'}</option>                    
                <option value={'66335a87863710c59eae0f58'}>{'Bronze Dragon (Lightning)'}</option>                    
                <option value={'66335a87863710c59eae0f71'}>{'Copper Dragon (Acid)'}</option>                    
                <option value={'66335a87863710c59eae0f6f'}>{'Brass Dragon (Fire)'}</option>                                 
            </select>
        </div>
    }
}

export default AncestorDropdown