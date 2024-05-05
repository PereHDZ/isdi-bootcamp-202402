import { useState, useEffect } from 'react'
import SubclassList from '../components/SubclassList'

function SelectSubclass({ onReturn }){
    const [subclasses, setSubclasses] = useState(null)

    const handleReturnClick = () => onReturn()

    return <section>
        <div className="return-div">
            <button className="transparent-button" onClick={handleReturnClick}>
                <img src="../../public/icons/return.png" className="icon"></img>
            </button>
            <h3 className="return">RETURN</h3>
        </div>

        <h1 className='home-title'>SELECT SUBCLASS</h1>

        <SubclassList/>
    </section>
}

export default SelectSubclass