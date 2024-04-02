import Component from "./Component.mjs"

class Button extends Component {
    constructor(){
        super('button')
    }

    //setters

    setType(type){
        //validation

        if (typeof type !== 'string')
            throw new TypeError('type is not a string')

        //logic
        this._container.type = type
    }
}

export default Button