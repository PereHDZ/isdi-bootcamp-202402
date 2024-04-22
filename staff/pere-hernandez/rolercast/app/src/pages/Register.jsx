import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

function Register({ onUserRegistered, onLoginClick }) {
    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const confirmedPassword = form.confirmPassword.value

        try {
            logic.registerUser(username, email, password, confirmedPassword)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    return <main>
    <div className='logo-div'>
        <img src='../../public/gallery/logo.png' className='logo'></img>

        <h1>ROLERCAST</h1>
    </div>

    <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text'></input>

        <label htmlFor='email'>Email</label>
        <input id='email' type='email'></input>

        <label htmlFor='password'>Password</label>
        <input id='password' type='password'></input>

        <label htmlFor='confirmPassword'>Confirm your password</label>
        <input id='confirmPassword' type='password'></input>

        <button type='submit' className='submit-button'>Register</button>

        <p className='change-page'>Already have an account? <a href='' onClick={handleLoginClick}>Login</a></p>
    </form>
</main>
}

export default Register