import logic from "../logic";

import { Component } from "react";

class Chat extends Component{
    constructor(){
        super()

        try {
            const users = logic.retrieveUsers()

            this.state = {users , user: null, chat: null}
        } catch (error) {
            alert(error.message)
        }
    }

    render(){
        if(this.state.chat === null){
            return <section className="chat-section">
                <ul>
                    {this.state.users.map(user => {
                        let userClass

                        if(user.status === 'online'){
                            userClass = 'user-online'
                        } else {
                            userClass = 'user-offline'
                        }

                        return <li key={user.id} className={userClass} onClick={event => {
                            event.preventDefault()

                            const user2 = user

                            let chat

                            try{
                                chat = logic.retrieveChatWith(user.id)
                            } catch (error) {
                                alert(error.message)
                            }

                            if(!chat) chat = logic.createChat(user) 
                            
                            this.setState({ user: user2 ,chat: chat})
                        }}>{user.username}</li>
                        })
                    }
                </ul>
            </section>
        } else {
            return <section>
                <div className="title-div">
                    <h3 className="chat-title">{this.state.user.username}</h3>

                    <button className="transparent-button" onClick={event => {
                        event.preventDefault()

                        this.setState({user: null, chat: null})
                    }}>
                        <img className="return-img" src="../../return.png"></img>
                    </button>
                </div>

                <ul className="message-list">
                    {this.state.chat.messages.map(message => {
                        let messageClass

                        if (message.author === logic.getLoggedInUserId()){
                            messageClass = 'message-sent'
                        } else {
                            messageClass = 'message-recieved'
                        }
                        
                        return <li key={message.id} className={messageClass}>{message.text}</li>})}
                </ul>

                <form className="message-form" onSubmit={event => {
                    event.preventDefault()

                    const form = event.target

                    const text = form.text.value

                    try {
                        const message = logic.createMessage(text)

                        logic.addMessageToChat(message, this.state.chat.id)

                        const chat = logic.retrieveChatWith(this.state.user.id)

                        form.reset()

                        this.setState({ chat })
                    } catch (error) {
                        alert(error.message)
                    }
                }}>
                    <label htmlFor="text"></label>
                    <input id="text" className="message-input"></input>

                    <button type="submit" className="transparent-button">
                        <img src="../../mail.png" className="send-message-icon"></img>
                    </button>
                </form>
            </section>
        }
    }
}

export default Chat