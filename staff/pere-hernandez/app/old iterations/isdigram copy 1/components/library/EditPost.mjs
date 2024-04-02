import logic from "../../logic.mjs";

import Component from "../core/Component.mjs";

import Form from "../core/Form.mjs";
import Label from "../core/Label.mjs";
import Input from "../core/Input.mjs";
import Button from "../core/Button.mjs";

class EditPost extends Component {
    constructor(post) {
        super('section')

        this.setClass('edit-post-section')

        const form = new Form
        form.setClass('edit-post-form')

        const textLabel = new Label
        textLabel.setFor('text')

        const textInput = new Input
        textInput.setId('text')
        textInput.setClass('edit-post-input')
        textInput.setType('text')
        textInput.setValue(post.comment)

        const editButton = new Button
        editButton.setText('Edit')
        editButton.setClass('edit-form-submit')
        editButton.setType('submit')

        form.add(textLabel, textInput, editButton)

        const cancelButton = new Button
        cancelButton.setText('Cancel')
        cancelButton.setClass('cancel-edit-button')

        this._cancelButton = cancelButton

        form.onSubmit(event => {
            event.preventDefault()

            const text = textInput.getValue()

            try {
                logic.updatePost(post.id, text)

                this._onEditedPostCallback()
            } catch (error) {
                alert(error.message)
            }
        })

        this.add(form, cancelButton)

        EditPost.active = true
    }

    static active = false

    onCancelClick (callback){
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._cancelButton.onClick(() => {
            EditPost.active = false

            callback()
        })
    }

    onEditedPost(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onEditedPostCallback = () => {
            EditPost.active = false
            
            callback()
        }
    }
}

export default EditPost