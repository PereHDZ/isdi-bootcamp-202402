import logic from "../logic.mjs";

import { Component } from "react";

class CreatePost extends Component {
    constructor(){
        super()
    }

    handleSubmit(event){
        event.preventDefault()

        const form = event.target

        const photo = form.photo.value
        const comment = form.comment.value

        try {
            logic.createPost(photo, comment)

            form.reset()
        } catch (error) {
            alert(error.message)
        }

        this.props.onNewPost()
    }

    handleCancelClick(event){
        event.preventDefault()

        this.props.onCancelNewPostClick()
    }

    render(){
        return <section id="create-post">
            <h2>Create a new post</h2>

            <form onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor="photo">Paste your URL here</label>
                <input id="photo" type="text"></input>

                <label htmlFor="comment">Write a comment here</label>
                <input id="comment" type="text"></input>

                <button type="submit" className="submit-post-button">Post</button>
            </form>

            <button className="secondary-button" onClick={this.handleCancelClick.bind(this)}>Cancel</button>
        </section>
    }
}

export default CreatePost