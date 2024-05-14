function ChosenNaturalExplorer ({ item: characterClass, chosenNaturalExplorer }){
    if (characterClass.name === 'Ranger' && !!chosenNaturalExplorer){
        return <div>
            <h5 className='margin-left'>YOUR NATURAL EXPLORER</h5>
            <div className='deity-info'>
                <p><strong>{chosenNaturalExplorer.name}: </strong>{chosenNaturalExplorer.description}</p>
            </div>
        </div>
    }
}

export default ChosenNaturalExplorer