import logic from "../logic.mjs";

import Component from "../components/core/Component.mjs";

import Header from "../components/library/Header.mjs";
import Footer from "../components/library/Footer.mjs";
import CreatePost from "../components/library/CreatePost.mjs";
import Menu from "../components/library/Menu.mjs";
import PostList from "../components/library/PostList.mjs";
import Chat from "../components/library/Chat.mjs";

class Home extends Component {
    constructor(){
        super('main')

        this.setId('home-main')

        const header = new Header

        header.onLogoutClick(() => {
            PostList.active = false
            Chat.active = false

            this._onLogoutCallback()
        })

        this.add(header)

        try {
            const user = logic.retrieveUser()

            const greeting = new Component('h1')
            greeting.setText('Hello, ' + user.username + '!')
            greeting.setId('greeting')

            this.add(greeting)
        } catch (error) {
            alert(error.message)
        }

        const menu = new Menu
        const chat = new Chat

        this.add(menu)

        menu.onChatClick(() => {
            PostList.active = false

            this.remove(postList)
            this.remove(footer)

            Chat.active = true

            this.add(chat)
        })

        menu.onHomeClick(() => {
            Chat.active = false
            PostList.active = true
            
            this.remove(chat)

            this.add(postList, footer)
        })

        const postList = new PostList

        postList.onEditPostClick(() => {
            PostList.active = false
        })

        postList.onEditedPost(() => {
            PostList.active = true
        })

        postList.on

        this.add(postList)

        const footer = new Footer

        footer.onNewPostClick(() => {
            if(!CreatePost.active) {
                PostList.active = false
                const createPost = new CreatePost

                this._container.style.overflow = 'hidden'

                createPost.onCancelClick(() => {
                    PostList.active = true
                    this.remove(createPost)
                    this._container.style.overflow = 'visible'
                })

                createPost.onPostCreated(() => {
                    PostList.active = true
                    this.remove(createPost)

                    this._container.style.overflow = 'visible'

                    postList.refresh()
                })

                this.add(createPost)
            }
        })

        this.add(footer)

        this._onLogoutCallback = null
    }

    onLogout(callback){
        //validation

        if(typeof callback !== 'function')
            throw new TypeError('callback is not a string')

        //logic

        this._onLogoutCallback = callback
    }
}

export default Home