import logic from "../../logic.mjs";

import Component from "../core/Component.mjs";

class MessageList extends Component {
    constructor(user){
        super('ul')

        this._user = user

        this.setClass('message-list')

        this.refresh()

        setInterval(() => {
            MessageList.active && this.refresh(), 1000
        })

        MessageList.active = true
    }

    refresh(){
        this.removeAll()

        try {
            const messages = logic.retrieveMessagesWith(this._user.id)

            messages.forEach(message => {
                const messageLi = new Component ('li')
                messageLi.setText(message.text)

                if (message.author === logic.getLoggedInUserId())
                    messageLi.setClass('message-sent')
                else
                    messageLi.setClass('message-recieved')

                this.add(messageLi)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    static active = false
}

export default MessageList