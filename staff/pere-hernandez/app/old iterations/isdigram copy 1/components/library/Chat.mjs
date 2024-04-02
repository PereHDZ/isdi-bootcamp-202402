import Component from "../core/Component.mjs";

import UserList from "./UserList.mjs";
import Button from "../core/Button.mjs";
import Image from "../core/Image.mjs";
import MessageList from "./MessageList.mjs";
import CreateMessage from "./CreateMessage.mjs";

class Chat extends Component {
    constructor() {
        super('section')

        this.setId('chat-section')

        const userList = new UserList
        let titleDiv
        let chatTitle
        this._messageList
        let messageForm

        userList.onUserClick(user => {
            this.remove(userList)
            
            titleDiv = new Component()
            titleDiv.setClass('title-div')

            chatTitle = new Component ('h3')
            chatTitle.setClass('chat-title')

            const returnButton = new Button
            returnButton.setClass('transparent-button')

            returnButton.onClick(() => {
                this.remove(titleDiv)
                this.remove(this._messageList)
                this.remove(messageForm)

                this.add(userList)
            })

            const returnImage = new Image
            returnImage.setSource('../../return.png')
            returnImage.setClass('return-img')

            returnButton.add(returnImage)

            titleDiv.add(chatTitle, returnButton)

            chatTitle.setText(user.username)

            this.add(titleDiv)

                this._messageList = new MessageList(user)
                messageForm = new CreateMessage(user)

                messageForm.onMessageSent(() => this._messageList.refresh())

                this.add(this._messageList, messageForm)
            })

        this.add(userList)

        Chat.active = true
    }
    
    static set active(status){
        MessageList.active = status
    }
}

export default Chat