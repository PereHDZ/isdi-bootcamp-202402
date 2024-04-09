import logic from "../logic.mjs";

function CreatePost(props) {

    const handleSubmit = event => {
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

        props.onNewPost()
    }

    const handleCancelClick= event => {
        event.preventDefault()

        props.onCancelNewPostClick()
    }

    return <section id="create-post">
        <h2>Create a new post</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="photo">Paste your URL here</label>
            <input id="photo" type="text"></input>

            <label htmlFor="comment">Write a comment here</label>
            <input id="comment" type="text"></input>

            <button type="submit" className="submit-post-button">Post</button>
        </form>

        <button className="secondary-button" onClick={handleCancelClick}>Cancel</button>
    </section>
}

export default CreatePost