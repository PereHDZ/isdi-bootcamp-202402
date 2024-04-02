import logic from "../../logic.mjs";

import Component from "../core/Component.mjs";

class UserList extends Component {
    constructor(){
        super('ul')

        try {
            const users = logic.retrieveUsers()

            users.forEach(user => {
                const userLi = new Component ('li')
                userLi.setText(user.username)

                if (user.status === 'online')
                    userLi.setClass('user-online')
                else
                    userLi.setClass('user-offline')

                userLi.onClick(() => this._onUserClickCallbac(user))

                this.add(userLi)
            })
        } catch (error) {
            alert(error.message)
        }
    }
    
    onUserClick(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onUserClickCallbac = callback
    }
}

export default UserList