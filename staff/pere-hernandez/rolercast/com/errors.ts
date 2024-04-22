function buildErrorClass(name) {
    return class extends Error {
        constructor(message) {
            super(message)

            this.name = name
        }

        //@ts-ignore
        static get name(){
            return name
        }
    }
}

const ContentError = buildErrorClass('ContentError')
const SystemError = buildErrorClass('SystemError')
const DuplicityError = buildErrorClass('DuplicityError')
const CredentialsError = buildErrorClass('CredentialsError')
const NotFoundError = buildErrorClass('NotFoundError')

const errors = {
    ContentError,
    SystemError,
    DuplicityError,
    CredentialsError,
    NotFoundError
}

export {
    ContentError,
    SystemError,
    DuplicityError,
    CredentialsError,
    NotFoundError
}

export default errors