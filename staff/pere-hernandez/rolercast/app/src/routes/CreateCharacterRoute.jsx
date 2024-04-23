import logic from '../logic'
import { useState, useEffect } from 'react'

import RaceList from '../components/RaceList'

function CreateChatacterRoute(){
    const [races, setRaces] = useState(null)

    return <section>
        <h1 className='home-title'>SELECT YOUR RACE</h1>

        <RaceList/>
    </section>
}

export default CreateChatacterRoute