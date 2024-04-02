import Component from "./Component.mjs"

class Image extends Component {
    constructor(){
        super('img')
    }

    //setters

    setSource(source){
        //validation
        if(typeof source !== 'string')
            throw new TypeError ('source is not a string')

        //logic

        this._container.src = source
    }
}

export default Image