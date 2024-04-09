import logic from "../logic.mjs";

function Login (props) {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password, error => {
                if (error){
                    alert(error.message)

                    return
                }
            })

            form.reset()

            props.onUserLoggedIn()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main>
        <img id="login-logo-img" src="../../logo.png"></img>

        <h1 className="title">Isdigram.</h1>

        <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Write your username here</label>
            <input id="username" type="text"></input>

            <label htmlFor="password">Write your password here</label>
            <input id="password" type="password"></input>

            <button type="submit" className="submit-button">Log In</button>
        </form>

        <button className="secondary-button" onClick={handleRegisterClick}>Register</button>
    </main>
}

export default Login