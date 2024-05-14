import { useExpertises } from '../../pages/Home'

function Expertises () {
    const { expertises } = useExpertises()

    if (Object.keys(expertises).length > 0){
        const expertisesArray = Object.keys(expertises)

        const expertisesString = expertisesArray.join(', ')

        return <div>
            <h4>YOUR EXPERTISES</h4>

            <p className='spell-p'>{expertisesString}</p>
        </div>
    }
    return <></>
}

export default Expertises