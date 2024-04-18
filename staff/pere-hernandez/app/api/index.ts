import mongoose from "mongoose"
import express from 'express'
import logic from "./logic/index.ts"
import { errors } from 'com'
import tracer from 'tracer'
import colors from 'colors'
import jwt from 'jsonwebtoken'

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const { ContentError, SystemError, DuplicityError, CredentialsError, NotFoundError, StatusError } = errors

mongoose.connect('mongodb://localhost:27017/isdigram')
    .then(() => {
        const db = mongoose.connection.db

        const users = db.collection('users')
        const posts = db.collection('posts')

        logic.users = users
        logic.posts = posts

        const api = express()

        const jsonBodyParser = express.json()

        api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')

            next()
        })

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { username, email, password, confirmedPassword } = req.body

                logic.registerUser(username, email, password, confirmedPassword)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError){
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError){
                            logger.warn(error.message)

                            res.status(409).json({  error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError){
                            logger.warn(error.message)

                            res.status(406).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(500).json({  error: error.constructor.name, message: error.message })
                }
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => {
                        const token = jwt.sign({ sub: userId }, 'Isdigram is just an Instagram rip-off')

                        res.json(token)
                    })
                    .catch(error => {
                        if (error instanceof SystemError){
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError){
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError){
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof StatusError){
                            logger.warn(error.message)

                            res.status(406).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, 'Isdigram is just an Instagram rip-off')

                const { targetUserId } = req.params

                logic.retrieveUser(userId as string, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError){
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, 'Isdigram is just an Instagram rip-off')

                const { image, comment } = req.body

                logic.createPost(userId as string, image, comment)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError){
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.get('/posts', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, 'Isdigram is just an Instagram rip-off')

                logic.retrievePosts(userId as string) 
                    .then(posts => res.json(posts))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.error(error.message)

                            res.status(404).json({ error: error.constructor, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.error(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.error(error.message)
                    
                    res.status(404).json({ error: error.constructor.name, message: error.message })
                }
            }
        })
        api.listen(8000, () => logger.info('API listening on port 8000'))
    })
    .catch(error => logger.error(error))