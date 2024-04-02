import logic from "../logic.mjs"

import {Component} from "react"

class Register extends Component {
    constructor(){
        super()
    }

    handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value

        try{
            logic.registerUser(username, email, password, confirm)

            form.reset()

            this.props.onRegistered()
        } catch (error) {
            alert(error.message)
        }
    }

    handleLoginClick = event => {
        event.preventDefault()

        this.props.onLoginClick()
    }

    render(){
        return <main>
            <img id='register-logo-img' src='../../logo.png' />

            <h1 className="title">Isdigram.</h1>

            <form id="register-form" onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor="username">Write your username here</label>
                <input id="username" type="text"></input>

                <label htmlFor="email">Write your email here</label>
                <input id="email" type="email"></input>

                <label htmlFor="password">Write your password here</label>
                <input id="password" type="password"></input>

                <label htmlFor="confirm">Confirm your password</label>
                <input id="confirm" type="password"></input>

                <button type="submit" className="submit-button">Register</button>
            </form>

            <button className="secondary-button" onClick={this.handleLoginClick.bind(this)}>Login</button>
        </main>
    }
}

export default Register