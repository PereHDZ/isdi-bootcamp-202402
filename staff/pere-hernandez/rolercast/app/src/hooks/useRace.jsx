import { createContext, useContext } from "react"

export const RaceContext = createContext(null)

const useRace = () => useContext(RaceContext)

export default useRace