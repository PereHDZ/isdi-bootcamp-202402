import logic from "../logic"

import { useState, useEffect, useContext, createContext } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'

import HomeRoute from '../routes/HomeRoute'
import SelectRace from "../routes/SelectRace"
import ConfirmRace from "../routes/ConfirmRace"
import SelectSubRace from "../routes/SelectSubrace"
import SelectCharacterClass from "../routes/SelectCharacterClass"
import ConfirmCharacterClass from "../routes/ConfirmCharacterClass"
import ConfirmSubace from "../routes/ConfirmSubrace"
import SelectBackground from "../routes/SelectBackground"
import SelectSubclass from "../routes/SelectSubclass"
import ConfirmSubclass from "../routes/ConfirmSubclass"
import ConfirmBackground from "../routes/ConfirmBackground"
import AssignStats from "../routes/AssignStats"
import SelectSpells from "../routes/SelectSpells"
import retrieveCharacterClass from "../logic/retrieveCharacterClass"


const RaceContext = createContext(null)
const CharacterClassIdContext = createContext(null)
const BackgroundIdContext = createContext(null)
const SpellsContext = createContext(null)

export const useRace = () => useContext(RaceContext)
export const useCharacterClassId = () => useContext(CharacterClassIdContext)
export const useBackgroundId = () => useContext(BackgroundIdContext)
export const useSpells = () => useContext(SpellsContext)

function Home({ onUserLoggedOut }) {
    const [race, setRace] = useState(null)
    const [characterClassId, setCharacterClassId] = useState(null)
    const [spells, setSpells] = useState([])
    const [backgroundId, setBackgroundId] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (race !== null && characterClassId === null){
            if (!!race.parent){
                navigate('/confirmSubRace')

                return
            }

            navigate('/confirmRace')
        }            
    }, [race])
    
    useEffect(() => {
        if (characterClassId !== null){
            try {
                logic.retrieveCharacterClass(characterClassId)
                    .then(characterClass => {
                        if (!!characterClass.parent){
                            navigate('/confirmSubclass')

                            return
                        }

                        navigate('/confirmClass')
                    })
                    .catch(error => alert(error))
            } catch(error) {
                alert(error)
            }
        }
            
    }, [characterClassId])
    
    useEffect(() => {
        if (backgroundId !== null) {
            navigate('/confirmBackground')
        }
    }, [backgroundId])

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
        setRace(null)

        navigate('/selectRace')
    }

    const handleReturnFromConfirmClass = () => {
        setCharacterClassId(null)

        navigate('/selectClass')
    }

    const handleReturnFromConfirmBackground = () => {
        setBackgroundId(null)

        navigate('/selectBackground')
    }

    const handleReturnFromSelectRace = () => navigate('/*')

    const handleReturnFromSelectSubrace = () => navigate('/confirmRace')

    const handleReturnFromSelectSubclass = () => navigate('/confirmClass')

    const handleReturnFromAssignStats = () => navigate('/confirmBackground')

    const handleReturnFromSelectClass = () => navigate('/selectRace')

    const handleReturnFromSelectSpells = () => navigate('/selectClass')

    const handleReturnFromConfirmSubrace = () => {
        try {
            logic.retrieveRace(race)
                .then(race => {
                    setRace(race.parent)
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }

        navigate('/selectSubrace')
    }

    const handleReturnFromConfirmSubclass = () => {
        try {
            logic.retrieveCharacterClass(characterClassId)
                .then(characterClass => {
                    setCharacterClassId(characterClass.parent)
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }

        navigate('/selectSubclass')
    }

    const handleRaceSelected = () => {
        try {
            logic.retrieveRaces()
                .then(races => {
                    const raceChildren = races.filter(raceChild => {
                        if (!!raceChild.parent){
                            if (raceChild.parent.toString() === race._id)
                                return raceChild
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
    
    const handleClassSelected = () => {
        try {
            logic.retrieveCharacterClasses()
                .then(characterClasses => {
                    const classChildren = characterClasses.filter(characterClass => {
                        if (!!characterClass.parent){
                            if(characterClass.parent.toString() === characterClassId)
                                return characterClass
                        }
                    })

                    if (classChildren.length > 0){
                        navigate('/selectSubClass')
                    } else {
                        retrieveCharacterClass(characterClassId)
                            .then(characterClass => {
                                if (!characterClass.parent && !characterClass.spellcasting) 
                                    navigate('/selectBackground')
                                else if (!!characterClass.spellcasting)
                                    navigate('/selectSpells')
                                else if (!!characterClass.parent){
                                    retrieveCharacterClass(characterClass.parent)
                                        .then(parentClass => {
                                            if (!!parentClass.spellcasting)
                                                navigate('/selectSpells')
                                        })
                                }
                            })
                        
                    }
                })
        } catch (error) {
            alert(error)
        }
    }

    const handleBackgroundSelected = () => navigate('/stats')    

    const handleReturnFromSelectBackground = () => navigate('/selectClass')

    return <>
    <RaceContext.Provider value={{setRace, race}}>
    <CharacterClassIdContext.Provider value={{setCharacterClassId, characterClassId}}>
    <BackgroundIdContext.Provider value={{setBackgroundId, backgroundId}}>
    <SpellsContext.Provider value={{setRace, spells}}>
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
            <Route path="/confirmClass" element={<ConfirmCharacterClass onReturnClick={handleReturnFromConfirmClass}  onCharacterClassSelected={handleClassSelected}/>}/>
            <Route path="/selectSubclass" element={<SelectSubclass onReturn={handleReturnFromSelectSubclass}/>}/>
            <Route path="/confirmSubclass" element={<ConfirmSubclass onReturnClick={handleReturnFromConfirmSubclass} onSubclassSelected={handleClassSelected}/>}/>
            <Route path="/selectSpells" element={<SelectSpells onReturn={handleReturnFromSelectSpells}></SelectSpells>}/>
            <Route path="/selectBackground" element={<SelectBackground onReturn={handleReturnFromSelectBackground}/>}/>
            <Route path="/confirmBackground" element={<ConfirmBackground onReturnClick={handleReturnFromConfirmBackground} onBackgroundSelected={handleBackgroundSelected}/>}/>
            <Route path="/stats" element={<AssignStats onReturnClick={handleReturnFromAssignStats}/>}/>
        </Routes>
    </main>
    </SpellsContext.Provider>
    </BackgroundIdContext.Provider>
    </CharacterClassIdContext.Provider>
    </RaceContext.Provider>
    </>
}

export default Home