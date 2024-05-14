function ChosenDeity({ item: [chosenDeity, characterClass] }) {
    if (characterClass.name.includes('Domain') && !!chosenDeity){
        return <div>
            <h5 className='margin-left'>YOUR DEITY</h5>
            <div className='deity-info'>
                <p><strong>{chosenDeity.name}: </strong>{chosenDeity.description}</p>
            </div>                
        </div>
    }
}

export default ChosenDeity