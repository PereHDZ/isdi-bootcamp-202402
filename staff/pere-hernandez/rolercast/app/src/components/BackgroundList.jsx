import logic from '../logic'

import { useState, useEffect } from 'react'

import SelectBackgroundComponent from './SelectBackgroundComponent'

function BackgroundList({ stamp }){
    const [backgrounds, setBackgrounds] = useState([])

    const loadBackgrounds = () => {
        try {
            logic.retrieveBackgrounds()
                .then(setBackgrounds)
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        loadBackgrounds()
    }, [stamp])

    return <section className='select-section'>
        {backgrounds.map(background => <SelectBackgroundComponent key={background.name} item={background}/>)}
    </section>
}

export default BackgroundList