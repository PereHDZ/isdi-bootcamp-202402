class ContentError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class CredentialsError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class NotFoundError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class StatusError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

const errors = {
    ContentError,
    SystemError,
    CredentialsError,
    DuplicityError,
    NotFoundError,
    StatusError
}

export {
    ContentError,
    SystemError,
    CredentialsError,
    DuplicityError,
    NotFoundError,
    StatusError
}

export default errors