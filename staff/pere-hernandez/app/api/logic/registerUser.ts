import { validate, errors } from 'com'

import { UserType, User } from '../data/index.ts'

const { SystemError, CredentialsError, DuplicityError } = errors

function registerUser(username: string, email: string, password: string, confirmedPassword: string): Promise<void> {
    //validation    
    validate.text(username, 'username', true)
    validate.mail(email)
    validate.password(password)
    if (password !== confirmedPassword) throw new CredentialsError('passwords do not match')

    //logic
    return User.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then((user: UserType) => {
            if (user) throw new DuplicityError('user already exists')

            user = {
                username: username,
                email: email,
                password: password
            }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default registerUser