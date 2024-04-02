import Component from "./Component.mjs"

class Form extends Component {
    constructor(){
        super('form')
    }

    //behaviour

    onSubmit(callback){
        //validation

        if(typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._container.onsubmit = callback
    }

    reset(){
        this._container.reset()
    }
}

export default Form