import logic from "../logic"

function CreatePost(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const comment = form.comment.value

        try {
            logic.createPost(image, comment)
                .then(() => {
                    form.reset()

                    props.onPostCreated()
                })
                .catch(alert)            
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    return <section id="create-post">
        <h2>Create a new post</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="photo">Paste your URL here</label>
            <input id="image" type="text"></input>

            <label htmlFor="comment">Write a comment here</label>
            <input id="comment" type="text"></input>

            <button type="submit" className="submit-post-button">Post</button>
        </form>

        <button className="secondary-button" onClick={handleCancelClick}>Cancel</button>
    </section>
}

export default CreatePost