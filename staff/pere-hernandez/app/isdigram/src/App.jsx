import { logger } from './utils/index.js'

import logic from './logic'

import { useState } from 'react'

import Landing from './pages/Landing.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'

function App() {
  const [view, setView] = useState(logic.checkLoggedStatus() ? 'home' : 'landing')

  const handleRegisterClik = () => setView('register')

  const handleLoginClick = () => setView('login')

  const handleUserLoggedIn = () => setView('home')

  logger.debug('App -> render')

  return <>
    {view === 'landing' && <Landing onRegisterClick={handleRegisterClik} onLoginClick={handleLoginClick}></Landing>}
    {view === 'register' && <Register onLoginClick={handleLoginClick} onRegistered={handleLoginClick}></Register>}
    {view === 'login' && <Login onRegisterClick={handleRegisterClik} onUserLoggedIn={handleUserLoggedIn}></Login>}
    {view === 'home' && <Home onLogout={handleLoginClick}></Home>}
  </>
}

export default App