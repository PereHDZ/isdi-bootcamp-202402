import logic from "../logic.mjs"

function Register (props) {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value

        try{
            logic.registerUser(username, email, password, confirm, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })

            form.reset()

            props.onRegistered()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return <main>
        <img id='register-logo-img' src='../../logo.png' />

        <h1 className="title">Isdigram.</h1>

        <form id="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Write your username here</label>
            <input id="username" type="text"></input>

            <label htmlFor="email">Write your email here</label>
            <input id="email" type="email"></input>

            <label htmlFor="password">Write your password here</label>
            <input id="password" type="password"></input>

            <label htmlFor="confirm">Confirm your password</label>
            <input id="confirm" type="password"></input>

            <button type="submit" className="submit-button">Register</button>
        </form>

        <button className="secondary-button" onClick={handleLoginClick}>Login</button>
    </main>
}

export default Register