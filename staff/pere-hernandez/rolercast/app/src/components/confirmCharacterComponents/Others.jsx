import { useCharacterClass, useInstrument, useDeity, useFightingstyle, useArchetype, useNaturalExplorer } from '../../pages/Home'

function Others () {
    const { characterClass } = useCharacterClass()
    const { instrument } = useInstrument()
    const { deity } = useDeity()
    const { fightingStyle } = useFightingstyle()
    const { archetype } = useArchetype()
    const { naturalExplorer } = useNaturalExplorer()

    if (characterClass.name === 'Bard'){
        return <div>
            <h4>YOUR INSTRUMENT</h4>

            <p className='spell-p'>{instrument}</p>
        </div>
    }

    if (characterClass.name.includes('Domain')){
        return <div>
        <h4>YOUR DEITY</h4>

        <p className='spell-p'>{deity.name}</p>
    </div>
    }

    if (characterClass.name === 'Fighter'){
        return <div>
        <h4>YOUR FIGHTING STYLE</h4>

        <p className='spell-p'>{fightingStyle.name}</p>
    </div>
    }

    if (characterClass.name === 'Ranger'){
        return <div>
            <h4>YOUR TYPE OF RANGER</h4>

            <p className='spell-p'><strong>Your Favoured Enemy: </strong>{archetype.name}</p>
            <p className='spell-p'><strong>Your Natural Explorer: </strong>{naturalExplorer
            .name}</p>
        </div>
    }
}

export default Others