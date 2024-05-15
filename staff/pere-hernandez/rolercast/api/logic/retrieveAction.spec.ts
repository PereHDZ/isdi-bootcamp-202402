import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User, Action } from '../data/models/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { DuplicityError, CredentialsError, ContentError } = errors

describe('retrieveAction', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves an existing action for user', () => 
        Promise.all([
            User.deleteMany(),
            Action.deleteMany()
        ])
        .then(() => User.create({ username: 'PereHDZ', email: 'pere@hdz.com', password: 'cuquis1992', avatar: null })
            .then(user => Action.create({ name: 'Light', description: 'Creates Light' })
                .then(action => {
                    expect(action.name).to.equal('Light')
                    expect(action.description).to.equal('Creates Light')
                })
            )
        )
    )
    after(() => mongoose.disconnect())
})