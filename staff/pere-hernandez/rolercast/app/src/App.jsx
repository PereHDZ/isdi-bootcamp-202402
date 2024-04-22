import { logger } from './utils'

import logic from './logic'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { errors } from 'com'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const { } = errors

function App() {
    const navigate = useNavigate()

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('/*')

    const handleLoggedUser = () => navigate('/home')

    logger.debug('App -> render')

    return <>
        <Routes>
            <Route path="/*" element={<Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleLoggedUser}/>}/>
            <Route path="/register" element={<Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick}/>}/>
            <Route path="/home" element={<Home></Home>}/>
        </Routes>
    </>
}

export default App