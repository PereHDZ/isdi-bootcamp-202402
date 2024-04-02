import Component from "../core/Component.mjs";

import Button from "../core/Button.mjs";
import Image from "../core/Image.mjs";

class Menu extends Component {
    constructor(){
        super('nav')

        const homeButton = new Button
        homeButton.setClass('transparent-button')

        const homeImg = new Image
        homeImg.setSource('../../home.png')
        homeImg.setClass('nav-button-img')

        homeButton.add(homeImg)

        homeButton.onClick(() => {
            this.replace(homeButton, chatButton)

            this._onHomeClickCallback()
        })

        const chatButton = new Button
        chatButton.setClass('transparent-button')

        const chatImg = new Image
        chatImg.setSource('../../chat.svg')
        chatImg.setClass('nav-button-img')

        chatButton.add(chatImg)

        chatButton.onClick(() => {
            this.replace(chatButton, homeButton)

            this._onChatClickCallback()
        })

        this.add(chatButton)

        this._onChatClickCallback = null
        this._onHomeClickCallback = null
    }

    onChatClick (callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onChatClickCallback = callback
    }

    onHomeClick (callback) {
        //validation

        if (typeof callback !== 'function')
        throw new TypeError ('callback is not a Function')
    
        //logic

        this._onHomeClickCallback = callback
    }
}

export default Menu