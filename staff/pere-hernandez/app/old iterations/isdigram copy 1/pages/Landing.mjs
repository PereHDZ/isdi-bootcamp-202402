import Component from "../components/core/Component.mjs"

import Button from "../components/core/Button.mjs"
import Image from "../components/core/Image.mjs"

class Landing extends Component{
    constructor(){
        super('main')

        const logoImg = new Image
        logoImg.setSource('logo.png')
        logoImg.setId('landing-img')

        const title = new Component('h1')
        title.setText('Welcome to Isdigram.')

        const logInButton = new Button
        logInButton.setText('Log In')
        logInButton.setClass('landing-button')


        logInButton.onClick(event => {
            event.preventDefault()

            this._onLoginClickCallback()
        })

        const registerButton = new Button
        registerButton.setText('Register')
        registerButton.setClass('landing-button')

        registerButton.onClick(event => {
            event.preventDefault()

            this._onRegisterClickCallback()
        })

        this.add(logoImg, title, logInButton, registerButton)

        this._onLoginClickCallback = null
        this._onRegisterClickCallback = null
    }

    onLoginClick(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //validation

        this._onLoginClickCallback = callback
    }

    onRegisterClick(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //validation

        this._onRegisterClickCallback = callback
    }
}

export default Landing