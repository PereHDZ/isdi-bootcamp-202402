import { logger } from "../utils"

function Landing(props) {

    const handleLoginClick = event => {
        event.preventDefault()

        
        props.onLoginClick()
    }

    const handleRegisterClik = event => {    
        event.preventDefault()

        
        props.onRegisterClick()
    }

    logger.debug('Landing -> render')


    return <main>
        <img src='../../logo.png' id='landing-img'></img>

        <h1>Welcome to Isdigram.</h1>

        <button className='landing-button' onClick={handleLoginClick}>Log In</button>

        <button className='landing-button' onClick={handleRegisterClik}>Register</button>
    </main>
    
}

export default Landing