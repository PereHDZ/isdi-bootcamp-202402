import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

function Login({ onUserLoggedIn, onRegisterClick }) {    
    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        logger.debug('Login -> handleSubmit', username, password)

        try {
            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    logger.debug('Login -> render')

    return <main>
        <div className='logo-div'>
            <img src='../../public/gallery/logo.png' className='logo'></img>

            <h1>ROLERCAST</h1>
        </div>

        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text'></input>

            <label htmlFor='password'>Password</label>
            <input id='password' type='password'></input>

            <button type='submit' className='submit-button'>Log In</button>
        </form>

        <p className='change-page'>First time here? <a href='' onClick={handleRegisterClick}>Register</a></p>
    </main>
}

export default Login