import logic from "../logic";

import { useState, useEffect } from "react";

import EditPost from "./EditPost";

function PostList (props) {
    const [posts, setPosts] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)

    try {
        logic.retrievePosts()
            .then(setPosts)
            .catch(alert)
    } catch (error) {
        alert(error.message)
    }

    /*const componentWillReceiveProps = newProps => {
        if (newProps.refreshStamp !== stamp){
            try {
                const posts = logic.retrievePosts()

                setPosts = posts
            } catch (error) {
                alert(error.message)
            }
        }
    }*/

    return <section id="post-list-section">
        {posts.map(post => <article key={post.id}>
            <h3 className="post-author">{post.author.username}</h3>

            <div className="post-photo-div">                
                <img src={post.photo} className="post-photo"></img>
            </div>

            {this.state.editingThisPost !== post.id && <p className="post-comment">{post.comment}</p>}

            {this.state.editingThisPost === post.id && <EditPost parameter={post}
                onCancel={() => {
                    this.setState({editingThisPost: 'none'})
                }}
                onEdited={() => {
                    try{
                        const posts = logic.retrievePosts()

                        this.setState({posts, editingThisPost: 'none'})
                    }catch (error){
                        alert(error.message)
                    }
                }}
            />}

            <time className="post-date">{post.date}</time>

            {post.author.id === sessionStorage.userId && this.state.editingThisPost === 'none' && <div className="post-buttons-div">
                <button className="post-button" onClick={event => {
                    event.preventDefault

                    if (confirm('Do you want to delete this post?')){
                        try{
                            logic.deletePost(post.id)

                            this.props.onDelete()
                        } catch (error) {
                            alert(error.message)
                        }
                    }
                }}>Delete</button>

                <button className="post-button" onClick={event => {
                    event.preventDefault()

                    this.setState({editingThisPost: post.id})
                }}>Edit</button>
            </div>}
        </article>)}
    </section>
}

export default PostList