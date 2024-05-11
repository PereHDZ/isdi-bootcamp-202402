import logic from "../logic"

import { useState, useEffect, useContext, createContext } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'

import HomeRoute from '../routes/HomeRoute'
import SelectRace from '../routes/SelectRace'
import ConfirmRace from '../routes/ConfirmRace'
import SelectSubRace from '../routes/SelectSubrace'
import SelectCharacterClass from '../routes/SelectCharacterClass'
import ConfirmCharacterClass from '../routes/ConfirmCharacterClass'
import ConfirmSubace from '../routes/ConfirmSubrace'
import SelectBackground from '../routes/SelectBackground'
import SelectSubclass from '../routes/SelectSubclass'
import ConfirmSubclass from '../routes/ConfirmSubclass'
import ConfirmBackground from '../routes/ConfirmBackground'
import AssignStats from '../routes/AssignStats'
import SelectCantrips from '../routes/SelectCantrips'
import SelectSpells from '../routes/SelectSpells'
import retrieveCharacterClass from '../logic/retrieveCharacterClass'
import retrieveRace from '../logic/retrieveRace'
import AssignSkills from "../routes/AssignSkills"
import ConfirmCharacter from "../routes/ConfirmCharacter"


const RaceContext = createContext(null)
const CharacterClassContext = createContext(null)
const BackgroundContext = createContext(null)
const CantripsContext = createContext(null)
const SpellsContext = createContext(null)
const StatsContext = createContext(null)
const DeityContext = createContext(null)
const FightingStyleContext = createContext(null)
const ArchetypeContext = createContext(null)
const NaturalExplorerContext = createContext(null)
const ProficienciesContext = createContext(null)
const ExpertisesContext = createContext(null)

export const useRace = () => useContext(RaceContext)
export const useCharacterClass = () => useContext(CharacterClassContext)
export const useBackground = () => useContext(BackgroundContext)
export const useCantrips = () => useContext(CantripsContext)
export const useSpells = () => useContext(SpellsContext)
export const useStats = () => useContext(StatsContext)
export const useDeity = () => useContext(DeityContext)
export const useFightingstyle = () => useContext(FightingStyleContext)
export const useArchetype = () => useContext(ArchetypeContext)
export const useNaturalExplorer = () => useContext(NaturalExplorerContext)
export const useProficiencies = () => useContext(ProficienciesContext)
export const useExpertises = () => useContext(ExpertisesContext)

function Home({ onUserLoggedOut }) {
    const [race, setRace] = useState(null)
    const [characterClass, setCharacterClass] = useState(null)
    const [cantrips, setCantrips] = useState([])
    const [spells, setSpells] = useState([])
    const [background, setBackground] = useState(null)
    const [stats, setStats] = useState(null)
    const [deity, setDeity] = useState(null)
    const [fightingStyle, setFightingStyle] = useState(null)
    const [archetype, setArchetype] = useState(null)
    const [naturalExplorer, setNaturalExplorer] = useState(null)
    const [proficiencies, setProficiencies] = useState(null)
    const [expertises, setExpertises] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (race !== null && characterClass === null){
            if (!!race.parent){
                navigate('/confirmSubRace')

                return
            }

            navigate('/confirmRace')
        }            
    }, [race])
    
    useEffect(() => {
        if (characterClass !== null){
            if (!!characterClass.parent){
                navigate('/confirmSubclass')

                return
            }

            navigate('/confirmClass')
        }            
    }, [characterClass])
    
    useEffect(() => {
        if (background !== null) {
            navigate('/confirmBackground')
        }
    }, [background])

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
        setCharacterClass(null)

        navigate('/selectClass')
    }

    const handleReturnFromConfirmBackground = () => {
        setBackground(null)

        navigate('/selectBackground')
    }

    const handleReturnFromSelectRace = () => navigate('/*')

    const handleReturnFromSelectSubrace = () => navigate('/confirmRace')

    const handleReturnFromSelectSubclass = () => navigate('/confirmClass')

    const handleReturnFromAssignStats = () => navigate('/confirmBackground')

    const handleReturnFromAssignSkills = () => navigate('/stats')

    const handleRetrunFromConfirmCharacter = () => navigate('/skills')

    const handleReturnFromSelectClass = () => navigate('/selectRace')

    const handleReturnFromSelectCantrips = () => navigate('/selectClass')

    const handleReturnFromSelectSpells = () => navigate('/selectCantrips')

    const handleReturnFromConfirmSubrace = () => {
        try {
            retrieveRace(race.parent)
                .then(parentRace => {
                    setRace(parentRace)

                    console.log(race.name)

                    navigate('/selectSubrace')
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }    
    }

    const handleReturnFromConfirmSubclass = () => {
        try {
            logic.retrieveCharacterClass(characterClass.parent)
                .then(parentClass => {
                    setCharacterClass(parentClass)

                    navigate('/selectSubclass')
                })
                .then(error => alert(error))
        } catch (error) {
            alert(error)
        }
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
                    const classChildren = characterClasses.filter(classChild => {
                        if (!!classChild.parent){
                            if(classChild.parent.toString() === characterClass._id)
                                return classChild
                        }
                    })

                    if (classChildren.length > 0){
                        navigate('/selectSubClass')
                    } else {
                        if (!characterClass.parent && !characterClass.spellcasting){
                            navigate('/selectBackground')
                        } else if (!!characterClass.spellcasting) {
                            navigate('/selectCantrips')
                        }else if (!!characterClass.parent){
                            retrieveCharacterClass(characterClass.parent)
                                .then(parentClass => {
                                    if (!!parentClass.spellcasting){
                                        navigate('/selectCantrips')
                                    } else {
                                        navigate('/selectBackground')
                                    }
                                })                           
                        }
                    }
                })
        } catch (error) {
            alert(error)
        }
    }

    const handleCantripsConfirmed = () => navigate('/selectSpells')

    const handleSpellsConfirmed = () => navigate('/selectBackground')

    const handleBackgroundSelected = () => navigate('/stats')    

    const handleReturnFromSelectBackground = () => navigate('/selectClass')

    const handleStatsSelected = () => navigate('/skills')

    const handleSkillsSelected = () => navigate('/confirmCharacter')

    return <>
    <RaceContext.Provider value={{setRace, race}}>
    <CharacterClassContext.Provider value={{setCharacterClass, characterClass}}>
    <BackgroundContext.Provider value={{setBackground, background}}>
    <CantripsContext.Provider value={{setCantrips, cantrips}}>
    <SpellsContext.Provider value={{setSpells, spells}}>
    <StatsContext.Provider value={{setStats, stats}}>
    <DeityContext.Provider value={{setDeity, deity}}>
    <FightingStyleContext.Provider value={{setFightingStyle, fightingStyle}}>
    <ArchetypeContext.Provider value={{setArchetype, archetype}}>
    <NaturalExplorerContext.Provider value={{setNaturalExplorer, naturalExplorer}}>
    <ProficienciesContext.Provider value={{setProficiencies, proficiencies}}>
    <ExpertisesContext.Provider value={{setExpertises, expertises}}>
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
            <Route path="/selectCantrips" element={<SelectCantrips onReturn={handleReturnFromSelectCantrips} onCantripsConfirmed={handleCantripsConfirmed}></SelectCantrips>}/>
            <Route path="/selectSpells" element={<SelectSpells onReturn={handleReturnFromSelectSpells} onSpellsConfirmed={handleSpellsConfirmed} />} />
            <Route path="/selectBackground" element={<SelectBackground onReturn={handleReturnFromSelectBackground}/>}/>
            <Route path="/confirmBackground" element={<ConfirmBackground onReturnClick={handleReturnFromConfirmBackground} onBackgroundSelected={handleBackgroundSelected}/>}/>
            <Route path="/stats" element={<AssignStats onReturnClick={handleReturnFromAssignStats} onStatsSelected={handleStatsSelected}/>}/>
            <Route path="/skills" element={<AssignSkills onRetrunClick={handleReturnFromAssignSkills} onSkillsConfirmed={handleSkillsSelected}/>}/>
            <Route path="/confirmCharacter" element={<ConfirmCharacter onRetrunClick={handleRetrunFromConfirmCharacter}/>}/>
        </Routes>
    </main>
    </ExpertisesContext.Provider>
    </ProficienciesContext.Provider>
    </NaturalExplorerContext.Provider>
    </ArchetypeContext.Provider>
    </FightingStyleContext.Provider>
    </DeityContext.Provider>
    </StatsContext.Provider>
    </SpellsContext.Provider>
    </CantripsContext.Provider>
    </BackgroundContext.Provider>
    </CharacterClassContext.Provider>
    </RaceContext.Provider>
    </>
}

export default Home