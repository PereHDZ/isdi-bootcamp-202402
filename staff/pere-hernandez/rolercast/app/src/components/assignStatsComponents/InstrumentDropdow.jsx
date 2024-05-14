function InstrumentDropdown ({ item: [characterClass, setInstrument] }) {
    const handleInstrumentChange = (event) => {
        setInstrument(event.target.value)
    }

    if (characterClass.name === 'Bard'){
        return <div className='margin-left'>
            <h5 className='deity-title'>SELECT YOUR INSTRUMENT</h5>

            <select value={null} onChange={handleInstrumentChange}>
                <option value={null}>Select Instrument</option>
                <option value={'Hand Drum'}>Hand Drum</option>
                <option value={'Flute'}>Flute</option>
                <option value={'Lute'}>Lute</option>
                <option value={'Lyre'}>Lyre</option>
                <option value={'Violin'}>Violin</option>
            </select>
        </div>
    }
}

export default InstrumentDropdown