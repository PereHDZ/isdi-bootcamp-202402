import logic from "../logic"

import { useState, useEffect } from "react"

import Menu from "../components/Menu"
import CreatePost from "../components/CreatePost"
import PostList from "../components/PostList"
import Chat from "../components/Chat"

function Home (props){
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const clearView = () => setView(null)

    const handleCreatePostClick = () => setView('create-post')

    const handleCancelCreatePostClick = () => clearView()

    const handlePostCreated = () => {
        clearView()
        setStamp(Date.now())
    }

    return <main id="home-main" className="home-main-scroll">
        <header>
            <div id="logo">
                <img src="../../logo.png" id="logo-img"></img>
    
                <h5 id="logo-title">Isdigram.</h5>
            </div>

            <button id="logout">Logout</button>
        </header>

        {user && <h1 id="greeting">Hello, {user.username}</h1>}

        {/*<PostList></PostList>*/}

        {view === 'create-post' && <CreatePost onCancelClick = {handleCancelCreatePostClick} onPostCreated = {handlePostCreated}></CreatePost>}

        {view !== 'create-post' && <footer>
            <button id="new-post-button" className="transparent-button" onClick={handleCreatePostClick}>
                <img id="new-post-button-img" src="../../circulo-plus.png"></img>
            </button>
        </footer>}
    </main>
}

export default Home