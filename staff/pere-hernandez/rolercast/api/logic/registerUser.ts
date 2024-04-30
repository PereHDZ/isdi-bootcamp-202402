import { validate, errors } from 'com'

import { User } from '../data/models/index.ts'
import { UserType } from '../data/types/index.ts'

const { SystemError, DuplicityError, CredentialsError } = errors

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
                password: password,
                avatar: null
            }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default registerUser