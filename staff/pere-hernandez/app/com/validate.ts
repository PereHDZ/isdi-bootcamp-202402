import { ContentError } from './errors'

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const URL_REGEX = /^(http|https):\/\//

const validate = {
    text(text, explain, checkEmptySpaceInside?) {
        if (typeof text !== 'string')
            throw new TypeError(explain + ' ' + text + ' is not a string')
        if (!text.trim().length)
            throw new Error(explain + ' >' + text + '< is empty or blank')    
        if (checkEmptySpaceInside)
            if (text.includes(' '))
                throw new Error(explain + ' ' + text + ' has empty spaces')
    },

    date(date, explain) {
        if (typeof date !== 'string')
            throw new TypeError(explain + ' ' + date) + ' is not a string'
        if (!DATE_REGEX.test(date))
            throw new Error(explain + ' ' + date + ' is not a date')
    },

    mail(email, explain = 'email') {
        if (!EMAIL_REGEX.test(email))
            throw new ContentError(`${explain} ${email} is not an email`);
    },
    password(password, explain = 'password') {
        if (!PASSWORD_REGEX.test(password))
            throw new ContentError(`${explain} is not acceptable`);
    },
    url(url, explain) {
        if (!URL_REGEX.test(url))
            throw new ContentError(explain + ' ' + url + ' is not an url');
    },
    callback(callback, explain = 'callback') {
        if (typeof callback !== 'function')
            throw new TypeError(`${explain} is not a Function`);
    }
}

export default validate