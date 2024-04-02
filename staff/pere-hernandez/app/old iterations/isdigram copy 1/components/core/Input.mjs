import Component from "./Component.mjs"

class Input extends Component {
    constructor(){
        super('input')
    }

    //setters

    setType(type){
        //validation

        if (typeof type !== 'string')
            throw new TypeError ('type is not a string')

        //logic

        this._container.type = type
    }

    setValue(value){
            //validation

            if (typeof value !== 'string')
            throw new TypeError ('value is not a string')
    
            //logic
    
            this._container.value = value
    }

    //getters

    getValue(){
        return this._container.value
    }
}

export default Input