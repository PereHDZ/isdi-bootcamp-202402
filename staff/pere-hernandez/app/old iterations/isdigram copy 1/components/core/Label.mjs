import Component from "./Component.mjs"

class Label extends Component {
    constructor(){
        super('label')
    }

    //setters

    setFor(forId){
        //validation

        if(typeof forId !== 'string')
            throw new TypeError('forId is not a string')

        //logic

        this._container.for = forId
    }
}

export default Label