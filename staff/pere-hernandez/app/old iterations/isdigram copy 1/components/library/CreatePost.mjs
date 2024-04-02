import Component from "../core/Component.mjs";

import logic from "../../logic.mjs";

import Form from "../core/Form.mjs";
import Label from "../core/Label.mjs";
import Input from "../core/Input.mjs";
import Button from "../core/Button.mjs";

class CreatePost extends Component {
    constructor(){
        super('section')

        this.setId('create-post')

        const title = new Component('h2')
        title.setText('Create a new post')

        const form = new Form

        const photoLabel = new Label
        photoLabel.setFor('photo')
        photoLabel.setText('Paste your URL here')

        const photoInput = new Input
        photoInput.setId('photo')
        photoInput.setType('text')

        const commentLabel = new Label
        commentLabel.setFor('comment')
        commentLabel.setText('Write a comment here')

        const commentInput = new Input
        commentInput.setId('comment')
        commentInput.setType('text')

        const newPostButton = new Button
        newPostButton.setType('submit')
        newPostButton.setText('Post')
        newPostButton.setClass('submit-post-button')

        form.add(photoLabel, photoInput, commentLabel, commentInput, newPostButton)

        const cancelButton = new Button
        cancelButton.setText('Cancel')
        cancelButton.setClass('secondary-button')

        this._cancelButton = cancelButton

        this.add(form, cancelButton)

        form.onSubmit(event => {
            event.preventDefault()

            const photo = photoInput.getValue()
            const comment = commentInput.getValue()

            try {
                logic.createPost(photo, comment)

                this._onPostCreatedCallback()
            } catch (error) {
                alert(error.message)
            }
        })

        this._onPostCreatedCallback = null
        
        CreatePost.active = true
    }

    static active = false

    onCancelClick(callback){
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._cancelButton.onClick(() => {
            CreatePost.active= false

            callback()
        })
    }

    onPostCreated (callback) {
        //validation

        if(typeof callback !== 'function')
            throw new TypeError('callback is not a Function')

        this._onPostCreatedCallback = () => {
            CreatePost.active = false

            callback()
        }
    }
}

export default CreatePost