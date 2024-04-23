import logic from "../logic"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import HomeRoute from "../routes/HomeRoute"
import CreateChatacterRoute from "../routes/CreateCharacterRoute"

function Home({ onUserLoggedOut }) {
    const navigate = useNavigate()

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

    return <main className="home-main">
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
            <Route path="/selectRace" element={<CreateChatacterRoute/>}/>
        </Routes>
    </main>
}

export default Home