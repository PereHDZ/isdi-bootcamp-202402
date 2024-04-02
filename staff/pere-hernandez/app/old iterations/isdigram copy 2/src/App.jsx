import logic from './logic.mjs'

import { Component } from 'react'

import Landing from './pages/Landing.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'

class App extends Component {
  constructor(){
    super()

    const online = logic.checkLoggedInStatus()

    if (!online)
      this.state = {view: 'landing'}
    else
      this.state = {view: 'home'}
  }

  displayPage = page => {
    //validation
    if(typeof page !== 'string')
      throw new TypeError('page must be a string')

    //logic
    this.setState({view: page })
  }

  render(){
    if (this.state.view === 'landing')
      return <Landing 
        onRegisterClick={()=> {this.displayPage('register')}}      
        onLoginClick={()=> {this.displayPage('login')}}
      />
    
    else if (this.state.view === 'register')
      return <Register 
        onLoginClick={()=> {this.displayPage('login')}}
        onRegistered={()=> {this.displayPage('login')}}
      />

    else if (this.state.view === 'login')
      return <Login 
        onRegisterClick={()=> {this.displayPage('register')}}
        onUserLoggedIn={()=> {this.displayPage('home')}}
      />

    else if (this.state.view === 'home')
      return <Home 
        onLogout={()=> {this.displayPage('login')}}
      />

    else{
      return <h1>Algo salió mal 😓</h1>
    }
  }
}

export default App