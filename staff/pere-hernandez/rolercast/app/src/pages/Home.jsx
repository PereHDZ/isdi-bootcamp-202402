import logic from "../logic"

import { useState, useEffect, useContext, createContext } from "react"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import HomeRoute from "../routes/HomeRoute"
import SelectRace from "../routes/SelectRace"
import ConfirmRace from "../routes/ConfirmRace"
import SelectSubRace from "../routes/SelectSubrace"
import SelectClass from "../routes/SelectClass"

const RaceIdContext = createContext(null)

export const useRaceId = () => useContext(RaceIdContext)

function Home({ onUserLoggedOut }) {
    const [raceId, setRaceId] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (raceId !== null) navigate('/confirmRace')
    }, [raceId])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            alert(error)
        } finally {
            onUserLoggedOut()
        }
    }

    const handleCreateClick = () => navigate('/selectRace')

    const handleReturn = () => {
        setRaceId(null)

        navigate('/selectRace')
    }

    const handleReturnFromSelectRace = () => navigate('/*')

    const handleReturnFromSelectSubrace = () => navigate('/confirmRace')

    const handleReturnFromSelectClass = () => navigate('/selectRace')

    const handleRaceSelected = () => {
        try {
            logic.retrieveRaces()
                .then(races => {
                    const raceChildren = races.filter(race => {
                        if (!!race.parent){
                            race.parent.toString() === raceId
                        }
                    })

                    if (raceChildren.length > 0){
                        navigate('/selectSubrace')
                    } else {
                        navigate('/selectClass')
                    }
                })
        } catch (error) {
            alert(error)
        }     
    } 

    return <>
    <RaceIdContext.Provider value={{setRaceId, raceId}}>
    <main className="home-main">
        <header>
            <button className="transparent-button">
                <img src="../../public/icons/navBar2.png" className="icon"></img>
            </button>

            <div className='header-logo-div'>
                <h1>ROLERCAST</h1>  
    
                <img src='../../public/gallery/logo.png' className='header-logo'></img>
            </div>

            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        </header>

        <Routes>
            <Route path="/*" element={<HomeRoute onCreateClick={handleCreateClick}/>}></Route>
            <Route path="/selectRace" element={<SelectRace onReturn={handleReturnFromSelectRace}/>}/>
            <Route path="/confirmRace" element={<ConfirmRace onReturnClick={handleReturn} onRaceSelected={handleRaceSelected}/>}/>
            <Route path="/selectSubrace" element={<SelectSubRace onReturn={handleReturnFromSelectSubrace}/>}/>
            <Route path="/selectClass" element={<SelectClass onReturn={handleReturnFromSelectClass}/>}/>
        </Routes>
    </main>
    </RaceIdContext.Provider></> 
}

export default Home