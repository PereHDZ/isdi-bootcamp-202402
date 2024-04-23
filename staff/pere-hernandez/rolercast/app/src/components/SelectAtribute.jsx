import { logger } from '../utils'

import { useContext } from 'react'

function SelectAtribute({ item: race }) {
    return <article className='select-atribute-article'>
        <button className='select-atribute-button'>
            <img src={`../../public/gallery/Race_Icons/Race_${race.name}.png`} className='select-button-icon'></img>
        </button>
        <h3>{race.name}</h3>
    </article>
}

export default SelectAtribute