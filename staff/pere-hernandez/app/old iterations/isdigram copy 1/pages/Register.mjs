import logic from "../logic.mjs"

import Component from "../components/core/Component.mjs"

import Image from "../components/core/Image.mjs"
import Form from "../components/core/Form.mjs"
import Label from "../components/core/Label.mjs"
import Input from "../components/core/Input.mjs"
import Button from "../components/core/Button.mjs"

class Register extends Component {
    constructor(){
        super('main')

        const logoImg = new Image
        logoImg.setSource('logo.png')
        logoImg.setId('register-logo-img')

        const title = new Component('h1')
        title.setText('Isdigram.')
        title.setClass('title')

        const form = new Form
        form.setId('register-form')

        const usernameLabel = new Label
        usernameLabel.setFor('username')
        usernameLabel.setText('Write your username here')

        const usernameImput = new Input
        usernameImput.setId('username')
        usernameImput.setType('text')

        const emailLabel = new Label
        emailLabel.setFor('email')
        emailLabel.setText('Write your email here')

        const emailImput = new Input
        emailImput.setId('email')
        emailImput.setType('email')

        const passwordLabel = new Label
        passwordLabel.setFor('password')
        passwordLabel.setText('Write your password here')

        const passwordImput = new Input
        passwordImput.setId('password')
        passwordImput.setType('password')

        const confirmPasswordLabel = new Label
        confirmPasswordLabel.setText('Repeat your password')
        confirmPasswordLabel.setFor('confirm')

        const confirmPasswordInput = new Input
        confirmPasswordInput.setId('confirm')
        confirmPasswordInput.setType('password')

        const submitButton = new Button
        submitButton.setText('Register')
        submitButton.setType('submit')
        submitButton.setClass('submit-button')

        form.onSubmit(event => {
            event.preventDefault()

            const username = usernameImput.getValue()
            const email = emailImput.getValue()
            const password = passwordImput.getValue()
            const confirmedPassword = confirmPasswordInput.getValue()

            try {
                logic.registerUser(username, email, password, confirmedPassword)

                form.reset()

                this._onRegisteredCallback()
            } catch (error) {
                alert(error.message)
            }
        })

        form.add(usernameLabel, usernameImput, emailLabel, emailImput, passwordLabel, passwordImput, confirmPasswordLabel, confirmPasswordInput, submitButton)
        
        const loginButton = new Button
        loginButton.setText('Log In')
        loginButton.setClass('secondary-button')

        loginButton.onClick(event => {
            event.preventDefault()

            this._onLogInClickCallback()
        })

        this.add(logoImg, title, form, loginButton)

        this._onRegisteredCallback = null
        this._onLogInClickCallback = null
    }

    onRegistered(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError('callack is not a Function')

        //logic

        this._onRegisteredCallback = callback
    }

    onLogInClick (callback) {
        //validation

        if (typeof callback !== 'function')
        throw new TypeError('callack is not a Function')

        //logic

        this._onLogInClickCallback = callback
    }
}

export default Register