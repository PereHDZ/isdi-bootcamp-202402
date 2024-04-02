import Component from "../core/Component.mjs";

import logic from "../../logic.mjs";

import Image from "../core/Image.mjs";
import Button from "../core/Button.mjs";
import EditPost from "./EditPost.mjs";

class Post extends Component {
    constructor(post){
        super('article')

        const author = new Component('h3')
        author.setText(post.author.username)
        author.setClass('post-author')

        const photoDiv = new Component
        photoDiv.setClass('post-photo-div')

        const photo = new Image
        photo.setSource(post.photo)
        photo.setClass('post-photo')

        photoDiv.add(photo)

        const comment = new Component ('p')
        comment.setText(post.comment)
        comment.setClass('post-comment')

        const date = new Component('time')
        date.setText(post.date)
        date.setClass('post-date')

        this.add(author, photoDiv, comment, date)

        if (post.author.id === sessionStorage.userId){
            const postButtonsDiv = new Component
            postButtonsDiv.setClass('post-buttons-div')

            const deleteButton = new Button
            deleteButton.setText('Delete')
            deleteButton.setClass('post-button')

            deleteButton.onClick(() => {
                if (confirm('Do you want to delete this post?'))
                    try {
                        logic.deletePost(post.id)

                        this._onDeletedCallback()
                    } catch (error) {
                        alert(console.message)
                    }
            })

            const editButton = new Button
            editButton.setText('Edit')
            editButton.setClass('post-button')

            editButton.onClick(() => {
                this._onEditClickCallback(post)

                if(!EditPost.active) {
                    const editPost = new EditPost(post)

                    editPost.onCancelClick(() => {
                        this.replace(editPost, comment)

                        this.add(postButtonsDiv)
                    })

                    editPost.onEditedPost(() => {
                        this._onEditedCallback()

                        this.replace(editPost, comment)

                        this.add(postButtonsDiv)
                    })
    
                    this.replace(comment, editPost)

                    this.remove(postButtonsDiv)
                }            
            })

            postButtonsDiv.add(deleteButton, editButton)

            this.add(postButtonsDiv)
        }

        this._onDeletedCallback = null
        this._onEditClickCallback = null
        this._onEditedCallback = null
    }

    onDeleted(callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onDeletedCallback = callback
    }

    onEditClick (callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onEditClickCallback = callback
    }

    onEdited (callback) {
        //validation

        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onEditedCallback = callback
    }
}

export default Post