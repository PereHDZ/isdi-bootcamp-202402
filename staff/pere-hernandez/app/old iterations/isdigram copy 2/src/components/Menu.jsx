import { Component } from "react";

class Menu extends Component {
    constructor(){
        super()

        this.state = { view: 'post'}
    }

    render(){
        return <nav>
            {this.state.view === 'post' && <button className="transparent-button" onClick={event => {
                event.preventDefault()

                this.setState({view: 'userList'})

                this.props.onChatClick()
            }}>
                    <img className="nav-button-img" src="../../chat.svg"></img>
                </button>}
            
            {this.state.view === 'userList' && <button className="transparent-button" onClick={event => {
                event.preventDefault()

                this.setState({view: 'post'})

                this.props.onHomeClick()
            }}>
                    <img className="nav-button-img" src="../../home.png"></img>
                </button>}

            {this.state.view === 'chat' && <button className="transparent-button">
                    <img className="nav-button-img" src="../../chat.svg"></img>
                </button>}

            {this.state.view === 'chat' && <button className="transparent-button">
                <img className="nav-button-img" src="../../home.png"></img>
            </button>}
        </nav> 
    }
}

export default Menu