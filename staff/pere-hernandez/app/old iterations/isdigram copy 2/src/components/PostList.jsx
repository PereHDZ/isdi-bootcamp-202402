import logic from "../logic.mjs";

import { Component } from "react";

import EditPost from "./EditPost";

class PostList extends Component {
    constructor(){
        super()

        try {
            const posts = logic.retrievePosts()

            this.state = { posts , editingThisPost: 'none'}
        } catch (error) {
            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.refreshStamp !== this.props.stamp){
            try {
                const posts = logic.retrievePosts()

                this.setState({ posts })
            } catch (error) {
                alert(error.message)
            }
        }
    }

    render(){        
        return <section id="post-list-section">
            {this.state.posts.map(post => <article key={post.id}>
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
}

export default PostList