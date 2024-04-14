import { Component } from "react";
import logic from "../logic";

class EditPost extends Component{
    constructor(props){
        super(props)

        this.props.parameter
    }

    handleSubmit(event){
        event.preventDefault()

        const form = event.target

        const text = form.text.value

        try {
            logic.updatePost(this.props.parameter.id, text)
        } catch (error) {
            alert(error.message)
        }

        this.props.onEdited()
    }

    handleCancel(event){
        event.preventDefault()

        this.props.onCancel()
    }

    render(){
        return <div className="edit-post-div">
            <form className="edit-post-form" onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor="text"></label>
                <input id="text" className="edit-post-input" type="text" placeholder={this.props.parameter.comment}></input>

                <button className="edit-form-submit" type="submit">Edit</button>
            </form>

            <button className="cancel-edit-button" onClick={this.handleCancel.bind(this)}>Cancel</button>
        </div>
    }
}

export default EditPost