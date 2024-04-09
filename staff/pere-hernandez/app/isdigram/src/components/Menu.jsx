import { Component } from "react";

class Menu extends Component {
    constructor(){
        super()

        this.state = { view: 'post'}
    }

    render(){
        return <nav>
            <button className="transparent-button">
                <img className="nav-button-img" src="../../chat.svg"></img>
            </button>
        </nav> 
    }
}

export default Menu