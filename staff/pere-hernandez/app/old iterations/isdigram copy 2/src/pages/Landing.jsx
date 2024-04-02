import { Component } from 'react'

class Landing extends Component{
    constructor(){
        super()
    }

    handleLoginClick (event) {
        event.preventDefault()

        this.props.onLoginClick()
    }

    handleRegisterClik (event) {
        event.preventDefault()

        this.props.onRegisterClick()
    }

    render(){
        return <main>
            <img src='../../logo.png' id='landing-img'></img>

            <h1>Welcome to Isdigram.</h1>

            <button className='landing-button' onClick={this.handleLoginClick.bind(this)}>Log In</button>

            <button className='landing-button' onClick={this.handleRegisterClik.bind(this)}>Register</button>
        </main>
    }
}

export default Landing