import { validate } from 'com'

function isUserLoggedIn() {
    try {
        validate.token(sessionStorage.token)

        return true
    } catch (error) {
        return false
    }
}

export default isUserLoggedIn