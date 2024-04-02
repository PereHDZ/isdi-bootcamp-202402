import logic from "../../logic.mjs";

import Form from "../core/Form.mjs";

import Label from "../core/Label.mjs";
import Input from "../core/Input.mjs";
import Button from "../core/Button.mjs";
import Image from "../core/Image.mjs";


class CreateMessage extends Form{
    constructor(user){
        super()

        this.setClass('message-form')

        const textLabel = new Label
        textLabel.setFor('text')

        const textInput = new Input
        textInput.setId('text')
        textInput.setClass('message-input')

        const sendMessageButton = new Button
        sendMessageButton.setType('submit')
        sendMessageButton.setClass('transparent-button')

        const sendMessageIcon = new Image
        sendMessageIcon.setSource('../../mail.png')
        sendMessageIcon.setClass('send-message-icon')

        sendMessageButton.add(sendMessageIcon)

        this.onSubmit(event => {
            event.preventDefault()

            const text = textInput.getValue()

            try{
                let chat = logic.retrieveChatWith(user.id)

                if (!chat)
                    chat = logic.createChat(user)

                const message = logic.createMessage(text)

                logic.addMessageToChat(message, chat.id)

                this.reset()

                this._onMessageSentCallback()
            } catch (error) {
                alert(error.message)
            }
        })

        this.add(textLabel, textInput, sendMessageButton)

        this._onMessageSentCallback = null
    }

    onMessageSent(callback){
        //validation

        if(typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onMessageSentCallback = callback
    }
}

export default CreateMessage