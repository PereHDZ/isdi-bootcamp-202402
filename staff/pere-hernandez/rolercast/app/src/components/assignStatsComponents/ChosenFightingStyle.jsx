function ChosenFightingStyle({ item: [characterClass, chosenFightingStyle]}) {
    if (characterClass.name === 'Fighter' && !!chosenFightingStyle){
        return <div>
            <h5 className='margin-left'>YOUR FIGHTING STYLE</h5>
            <div className='deity-info'>
                <p><strong>{chosenFightingStyle.name}: </strong>{chosenFightingStyle.description}</p>
            </div>                
        </div>
    }
}

export default ChosenFightingStyle