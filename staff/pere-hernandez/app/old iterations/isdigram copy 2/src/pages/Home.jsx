import logic from "../logic.mjs"

import { Component } from "react"

import Menu from "../components/Menu"
import CreatePost from "../components/CreatePost"
import PostList from "../components/PostList"
import Chat from "../components/Chat"

class Home extends Component {
    constructor(){
        super()

        try{
            const user = logic.retrieveUser()

            this.user = user
        } catch (error) {
            alert(error.message)
        }
        
        this.state = {view: null, stamp: null}
    }

    changeOverflowClass(){
        this.setState({overflow: !this.state.overflow})
    }

    handleLogout(){
        try {
            logic.logoutUser()
        } catch (error) {
            alert(error.message)
        }

        this.props.onLogout()
    }

    changeView(view){
        this.setState({view})
    }

    render(){
        return <main id="home-main" className="home-main-scroll">
            <header>
                <div id="logo">
                    <img src="../../logo.png" id="logo-img"></img>
        
                    <h5 id="logo-title">Isdigram.</h5>
                </div>

                <button id="logout" onClick={this.handleLogout.bind(this)}>Logout</button>
            </header>

            <h1 id="greeting">Hello, {this.user.username}</h1>

            <Menu onChatClick={() => this.changeView('chat')} onHomeClick={() => this.setState({view: null})}/>

            {this.state.view !== 'chat' && <footer>
                <button id="new-post-button" className="transparent-button" onClick={() => this.changeView('post-form')}>
                    <img id="new-post-button-img" src="../../circulo-plus.png"></img>
                </button>
            </footer>}
            
            {this.state.view !== 'chat' && <PostList refreshStamp={this.state.stamp} onDelete={() => this.setState({stamp: Date.now()})}/>}       
            
            {this.state.view === 'post-form' && <CreatePost onCancelNewPostClick={() => {this.changeView(null)}} onNewPost={() => {this.setState({view: null, stamp: Date.now()})}}/>}

            {this.state.view === 'chat' && <Chat />}
        </main>
    }
}

export default Home