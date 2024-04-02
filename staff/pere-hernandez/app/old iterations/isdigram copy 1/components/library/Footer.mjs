import Component from "../core/Component.mjs";

import Button from "../core/Button.mjs";
import Image from "../core/Image.mjs";

class Footer extends Component {
    constructor(){
        super('footer')

        const image = new Image
        image.setSource('../../circulo-plus.png')
        image.setId('new-post-button-img')

        const newPostButton = new Button
        newPostButton.setId('new-post-button')
        newPostButton.setClass('transparent-button')
        
        newPostButton.add(image)

        this._newPostButton = newPostButton

        this.add(newPostButton)
    }

    onNewPostClick(callback){
        this._newPostButton.onClick(callback)
    }
}

export default Footer