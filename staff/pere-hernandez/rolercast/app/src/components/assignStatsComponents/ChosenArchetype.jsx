function ChosenArchetype ({ item: [characterClass, chosenArchetype]}) {
    if (characterClass.name === 'Ranger' && !!chosenArchetype){
        return <div>
            <h5 className='margin-left'>YOUR FAVOURED ENEMY</h5>
            <div className='deity-info'>
                <p><strong>{chosenArchetype.name}: </strong>{chosenArchetype.description}</p>
            </div>
        </div>
    }
}

export default ChosenArchetype