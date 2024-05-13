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
import AssignSkills from '../routes/AssignSkills'
import ConfirmCharacter from '../routes/ConfirmCharacter'

import CharacterInfo from '../components/homeComponents/CharacterInfo'
import Header from '../components/homeComponents/Header'

const RaceContext = createContext(null)
const CharacterClassContext = createContext(null)
const BackgroundContext = createContext(null)
const CantripsContext = createContext(null)
const SpellsContext = createContext(null)
const ActionsContext = createContext(null)
const StatsContext = createContext(null)
const HpContext = createContext(null)
const DeityContext = createContext(null)
const FightingStyleContext = createContext(null)
const ArchetypeContext = createContext(null)
const NaturalExplorerContext = createContext(null)
const InstrumentContext = createContext(null)
const ProficienciesContext = createContext(null)
const ExpertisesContext = createContext(null)
const CharacterContext = createContext(null)

export const useRace = () => useContext(RaceContext)
export const useCharacterClass = () => useContext(CharacterClassContext)
export const useBackground = () => useContext(BackgroundContext)
export const useCantrips = () => useContext(CantripsContext)
export const useSpells = () => useContext(SpellsContext)
export const useActions = () => useContext(ActionsContext)
export const useStats = () => useContext(StatsContext)
export const useHp = () => useContext(HpContext)
export const useDeity = () => useContext(DeityContext)
export const useFightingstyle = () => useContext(FightingStyleContext)
export const useArchetype = () => useContext(ArchetypeContext)
export const useNaturalExplorer = () => useContext(NaturalExplorerContext)
export const useProficiencies = () => useContext(ProficienciesContext)
export const useExpertises = () => useContext(ExpertisesContext)
export const useInstrument = () => useContext(InstrumentContext)
export const useCharacter = () => useContext(CharacterContext)

function Home({ onUserLoggedOut }) {
    const [race, setRace] = useState(null)
    const [characterClass, setCharacterClass] = useState(null)
    const [cantrips, setCantrips] = useState([])
    const [spells, setSpells] = useState([])
    const [actions, setActions] = useState([])
    const [background, setBackground] = useState(null)
    const [stats, setStats] = useState(null)
    const [skills, setSkills] = useState(null)
    const [hp, setHp] = useState(null)
    const [deity, setDeity] = useState(null)
    const [fightingStyle, setFightingStyle] = useState(null)
    const [archetype, setArchetype] = useState(null)
    const [naturalExplorer, setNaturalExplorer] = useState(null)
    const [instrument, setInstrument] = useState(null)
    const [proficiencies, setProficiencies] = useState(null)
    const [expertises, setExpertises] = useState(null)
    const [character, setCharacter] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (race !== null){
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

    const handleReturnFromSelectRace = () => navigate('/*')

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
                        navigate('/selectBackground')
                    }
                })
        } catch (error) {
            alert(error)
        }
    }

    const handleReturnFromConfirmRace = () => {
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

    const handleReturnFromSelectSubrace = () => navigate('/confirmRace')

    const handleReturnFromSelectSubclass = () => navigate('/confirmClass')

    const handleReturnFromAssignStats = () => {
        setStats(null)

        navigate('/confirmBackground')
    }

    const handleReturnFromAssignSkills = () => {
        setSkills(null)

        navigate('/stats')
    } 

    const handleRetrunFromConfirmCharacter = () => navigate('/skills')

    const handleReturnFromSelectClass = () => navigate('/selectRace')

    const handleReturnFromSelectCantrips = () => navigate('/skills')

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

    const handleCantripsConfirmed = () => navigate('/selectSpells')

    const handleSpellsConfirmed = () => navigate('/confirmCharacter')

    const handleBackgroundSelected = () => navigate('/stats')    

    const handleReturnFromSelectBackground = () => navigate('/selectClass')

    const handleStatsSelected = () => navigate('/skills')

    const handleSkillsSelected = () => {
        if (!characterClass.parent && !!characterClass.spellcasting){
            navigate('/selectCantrips')
        } else if (!!characterClass.parent && (characterClass.name === 'Nature Domain' || characterClass.name.includes('The '))){
            navigate('/selectCantrips')
        } else  if (!characterClass.parent && !characterClass.spellcasting){
            navigate('/confirmCharacter')
        } else {
            try {
                logic.retrieveCharacterClass(characterClass.parent)
                    .then(parentClass => {
                        if (!!parentClass.spellcasting){
                            navigate('/selectCantrips')
                        } else {
                            navigate('/confirmCharacter')
                        }
                    })
            } catch (error) {
                alert(error)
            }
        }
    } 

    const handleCharacterCreated = () => {
        setRace(null)
        setCharacterClass(null)
        setCantrips([])
        setSpells([])
        setActions([])
        setBackground(null)
        setStats(null)
        setSkills(null)
        setHp(null)
        setDeity(null)
        setFightingStyle(null)
        setArchetype(null)
        setNaturalExplorer(null)
        setInstrument(null)
        setProficiencies(null)
        setExpertises(null)

        navigate("/*")
    }

    return <>
    <RaceContext.Provider value={{setRace, race}}>
    <CharacterClassContext.Provider value={{setCharacterClass, characterClass}}>
    <BackgroundContext.Provider value={{setBackground, background}}>
    <CantripsContext.Provider value={{setCantrips, cantrips}}>
    <SpellsContext.Provider value={{setSpells, spells}}>
    <ActionsContext.Provider value={{setActions, actions}}>
    <StatsContext.Provider value={{setStats, stats}}>
    <HpContext.Provider value={{setHp, hp}}>
    <DeityContext.Provider value={{setDeity, deity}}>
    <FightingStyleContext.Provider value={{setFightingStyle, fightingStyle}}>
    <ArchetypeContext.Provider value={{setArchetype, archetype}}>
    <NaturalExplorerContext.Provider value={{setNaturalExplorer, naturalExplorer}}>
    <InstrumentContext.Provider value={{setInstrument, instrument}}>
    <ProficienciesContext.Provider value={{setProficiencies, proficiencies}}>
    <ExpertisesContext.Provider value={{setExpertises, expertises}}>
    <CharacterContext.Provider value={{setCharacter, character}}>
    <main className={`home-main ${character ? 'no-scroll' : ''}`}>
        <Header onLogoutClick={handleLogoutClick}/>

        { !!character && <CharacterInfo/> }

        <Routes>
            <Route path="/*" element={<HomeRoute onCreateClick={handleCreateClick}/>}></Route>
            <Route path="/selectRace" element={<SelectRace onReturn={handleReturnFromSelectRace}/>}/>
            <Route path="/confirmRace" element={<ConfirmRace onReturnClick={handleReturnFromConfirmRace} onRaceSelected={handleRaceSelected}/>}/>
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
            <Route path="/confirmCharacter" element={<ConfirmCharacter onRetrunClick={handleRetrunFromConfirmCharacter} onCharacterCreated={handleCharacterCreated}/>}/>
        </Routes>
    </main>
    </CharacterContext.Provider>
    </ExpertisesContext.Provider>
    </ProficienciesContext.Provider>
    </InstrumentContext.Provider>
    </NaturalExplorerContext.Provider>
    </ArchetypeContext.Provider>
    </FightingStyleContext.Provider>
    </DeityContext.Provider>
    </HpContext.Provider>
    </StatsContext.Provider>
    </ActionsContext.Provider>
    </SpellsContext.Provider>
    </CantripsContext.Provider>
    </BackgroundContext.Provider>
    </CharacterClassContext.Provider>
    </RaceContext.Provider>
    </>
}

export default Home