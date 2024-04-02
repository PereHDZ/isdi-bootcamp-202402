import logic from "../logic.mjs";

import Component from "../components/core/Component.mjs";

import Image from "../components/core/Image.mjs";
import Form from "../components/core/Form.mjs";
import Label from "../components/core/Label.mjs";
import Input from "../components/core/Input.mjs";
import Button from "../components/core/Button.mjs";

class Login extends Component {
    constructor(){
        super('main')

        const logoImg = new Image
        logoImg.setSource('../logo.png')
        logoImg.setId('login-logo-img')

        const title = new Component('h1')
        title.setText('Isdigram.')
        title.setClass('title')

        const form = new Form
        form.setId('login-form')

        const usernameLabel = new Label
        usernameLabel.setFor('username')
        usernameLabel.setText('Write your username here')

        const usernameImput = new Input
        usernameImput.setId('username')
        usernameImput.setType('text')

        const passwordLabel = new Label
        passwordLabel.setFor('password')
        passwordLabel.setText('Write your password here')

        const passwordImput = new Input
        passwordImput.setId('password')
        passwordImput.setType('password')

        const submitButton = new Button
        submitButton.setText('Log In')
        submitButton.setType('submit')
        submitButton.setClass('submit-button')

        form.onSubmit(event => {
            event.preventDefault()

            const username = usernameImput.getValue()
            const password = passwordImput.getValue()

            try {
                logic.loginUser(username, password)

                form.reset()

                this._onUserLoggedInCallback()
            } catch (error) {
                alert(error.message)
            }
        })

        form.add(usernameLabel, usernameImput, passwordLabel, passwordImput, submitButton)

        const RegisterButton = new Button
        RegisterButton.setText('Register')
        RegisterButton.setClass('secondary-button')

        RegisterButton.onClick(event => {
            event.preventDefault()

            this._onRegisterClickCallback()
        })

        this.add(logoImg, title, form, RegisterButton)

        this._onRegisterClickCallback = null
        this._onUserLoggedInCallback = null
    }

    onRegisterClick(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError('callback is not a Functon')

        //logic
        this._onRegisterClickCallback = callback
    }

    onUserLoggedIn (callback){
        //validation

        if (typeof callback !== 'function')
            throw new TypeError('callback is not a Functon')

        //logic
        this._onUserLoggedInCallback = callback
    }
}

export default Login