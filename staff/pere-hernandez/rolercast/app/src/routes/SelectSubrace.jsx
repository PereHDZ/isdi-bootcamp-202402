import { useState, useEffect } from 'react'
import SubraceList from '../components/selectSubraceComponents/SubraceList'

function SelectSubrace({ onReturn }){
    const [subraces, setSubRaces] = useState(null)

    const handleReturnClick = () => onReturn()

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT SUBRACE</h1>

        <SubraceList/>
    </section>
}

export default SelectSubrace