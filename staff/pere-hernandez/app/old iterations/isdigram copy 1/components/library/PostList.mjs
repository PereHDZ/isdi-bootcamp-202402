import Component from "../core/Component.mjs";

import logic from "../../logic.mjs";

import Post from "./Post.mjs";

class PostList extends Component {
    constructor(){
        super('section')

        this.setId('post-list-section')

        this.refresh()

        setInterval(() => PostList.active && this.refresh(), 5000)

        PostList.active = true 
    }

    refresh() {
        try {
            const posts = logic.retrievePosts()

            this.removeAll()

            posts.forEach(post => {
                const post2 = new Post(post)

                post2.onDeleted(() => {
                    this.refresh()
                })

                post2.onEditClick((post) => {
                    this._onEditPostClick(post)
                })

                post2.onEdited((post) => {
                    this._onEditedPost(post)

                    this.refresh()
                }) 

                this.add(post2)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    static active = false

    onEditPostClick(callback) {
        //validation

        if(typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onEditPostClick = callback
    }

    onEditedPost(callback) {
        //validation

        if(typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic

        this._onEditedPost = callback
    }
}

export default PostList