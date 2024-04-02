import Component from "../core/Component.mjs";

import logic from "../../logic.mjs";

import Logo from "../core/Logo.mjs"
import Button from "../core/Button.mjs"

class Header extends Component {
    constructor(){
        super('header')

        const logo = new Logo

        const logoutButton = new Button
        logoutButton.setText('Logout')
        logoutButton.setId('logout')

        logoutButton.onClick(() => {
            try {
                logic.logoutUser()
            } catch (error) {
                alert(error.message)
            }
            this._onLogoutCallback()            
        })

        this.add(logo, logoutButton)

        this._onLogoutCallback = null
    }

    onLogoutClick(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

            this._onLogoutCallback = callback
    }
}

export default Header