class Component {
    constructor (tagOrContainer = 'div') {
        if (tagOrContainer instanceof HTMLElement)
            this._container = tagOrContainer
        else
            this._container = document.createElement(tagOrContainer)
    }

    //setters

    setText(text) {
        this._container.innerText = text
    }

    setId(id) {
        //validation

        if (typeof id !== 'string')
            throw new TypeError('id is not a string')

        //logic
        this._container.id = id
    }

    setClass(classname) {
        //validation

        if (typeof classname !== 'string')
            throw new TypeError('classname is not a string')

        //logic
        this._container.classList.add(classname)
    }

    //ensamblers

    add(){
        Array.prototype.forEach.call(arguments, child => {
            //validation

            if(!(child instanceof Component))
                throw new TypeError('child is not a Component')

            //logic
            this._container.appendChild(child._container)
        })
    }

    remove(child){
        //validation
        if(!(child instanceof Component))
        throw new TypeError('child is not a Component')

        //logic
        this._container.removeChild(child._container)
    }

    removeAll() {
        this._container.innerHTML = ''
    }

    replace (oldChild, newChild) {
        //validation

        if (!(oldChild instanceof Component))
            throw new TypeError ('oldChild is not a Component')
        if (!(newChild instanceof Component))
            throw new TypeError ('newChild is not a Component')

        //logic

        this._container.replaceChild(newChild._container, oldChild._container)
    }

    assembleTo (element) {
        //validation
        if (!(element instanceof HTMLElement))
            throw new TypeError ('element is not an HTMLElement')

        //logic
        element.appendChild(this._container)
    }

    //behaviour

    onClick(callback) {
        //validation

        if(typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._container.onclick = callback
    }
}

export default Component