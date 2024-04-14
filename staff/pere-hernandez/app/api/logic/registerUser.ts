import { validate, errors } from 'com'

const { SystemError, CredentialsError, DuplicityError } = errors

function registerUser(username: string, email: string, password: string, confirmedPassword: string, callback: Function) {
    //validation    
    validate.text(username, 'username', true)
    validate.mail(email)
    validate.password(password)
    validate.callback(callback)
    if (password !== confirmedPassword){
        callback(new CredentialsError('passwords do not match'))

        return
    }

    //logic
    this.users.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) {
                callback(new DuplicityError('user already exists'))

                return
            }

            user = {
                username: username,
                email: email,
                password: password,
                status: 'offline'
            }

            this.users.insertOne(user)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default registerUser