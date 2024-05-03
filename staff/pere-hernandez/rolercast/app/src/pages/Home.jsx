import logic from "../logic"

import { useState, useEffect, useContext, createContext } from "react"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import HomeRoute from '../routes/HomeRoute'
import SelectRace from "../routes/SelectRace"
import ConfirmRace from "../routes/ConfirmRace"
import SelectSubRace from "../routes/SelectSubrace"
import SelectCharacterClass from "../routes/SelectCharacterClass"
import ConfirmCharacterClass from "../routes/ConfirmCharacterClass"
import ConfirmSubace from "../routes/ConfirmSubrace"

const RaceIdContext = createContext(null)
const CharacterClassIdContext = createContext(null)

export const useRaceId = () => useContext(RaceIdContext)
export const useCharacterClassId = () => useContext(CharacterClassIdContext)

function Home({ onUserLoggedOut }) {
    const [raceId, setRaceId] = useState(null)
    const [characterClassId, setCharacterClassId] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (raceId !== null && characterClassId === null){
            try{
                logic.retrieveRace(raceId)
                    .then(race => {
                        if (!!race.parent){
                            navigate('/confirmSubRace')

                            return
                        }
                            
                        navigate('/confirmRace')
                    })
                    .catch(error => alert(error))
            } catch (error){
                alert(error)
            }
        }            
    }, [raceId])
    
    useEffect(() => {
        if (characterClassId !== null)
            navigate('/confirmClass')
    }, [characterClassId])

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

    const handleReturnFromConfirmClass = () => {
        setCharacterClassId(null)

        navigate('/selectClass')
    }

    const handleReturnFromSelectRace = () => navigate('/*')

    const handleReturnFromSelectSubrace = () => navigate('/confirmRace')

    const handleReturnFromSelectClass = () => navigate('/selectRace')

    const handleReturnFromConfirmSubrace = () => {
        try {
            logic.retrieveRace(raceId)
                .then(race => {
                    setRaceId(race.parent)
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }

        navigate('/selectSubrace')
    }

    const handleRaceSelected = () => {
        try {
            logic.retrieveRaces()
                .then(races => {
                    const raceChildren = races.filter(race => {
                        if (!!race.parent){
                            if (race.parent.toString() === raceId)
                                return race
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
    <CharacterClassIdContext.Provider value={{setCharacterClassId, characterClassId}}>
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
            <Route path="/confirmSubrace" element={<ConfirmSubace onReturnClick={handleReturnFromConfirmSubrace} onSubraceSelected={handleRaceSelected}/>}/>
            <Route path="/selectClass" element={<SelectCharacterClass onReturn={handleReturnFromSelectClass}/>}/>
            <Route path="/confirmClass" element={<ConfirmCharacterClass onReturnClick={handleReturnFromConfirmClass}/>}/>
        </Routes>
    </main>
    </CharacterClassIdContext.Provider>
    </RaceIdContext.Provider>
    </>
}

export default Home