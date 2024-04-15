import { MongoClient } from "mongodb"
import express from 'express'
import logic from "./logic/index.ts"
import { errors } from 'com'
import tracer from 'tracer'
import colors from 'colors'

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const { ContentError, SystemError, DuplicityError, CredentialsError, NotFoundError, StatusError } = errors

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('isdigram')

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

                logic.registerUser(username, email, password, confirmedPassword, error => {
                    if (error) {
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
                        return
                    }
                    res.status(201).send()
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

                logic.loginUser(username, password, (error, userId) => {
                    if (error) {
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
                        return
                    }
                    res.status(201).json(userId)
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

        api.patch('/users/:userId', (req, res) => {
            try {
                const { userId } = req.params

                logic.logoutUser(userId.toString(), (error, userId) => {
                    if (error) {
                        if (error instanceof SystemError){
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError){
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof StatusError){
                            logger.warn(error.message)

                            res.status(406).json({ error: error.constructor.name, message: error.message })
                        }
                        return
                    }
                    res.status(200).json(userId)
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
                const { authorization: userId } = req.headers

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId, (error, user) => {
                    if (error) {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError){
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                        return
                    }
                    res.json(user)
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
                const { authorization: userId } = req.headers

                const { image, comment } = req.body

                logic.createPost(userId, image, comment, error => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    res.status(201).send()
                })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts', (req, res) => {
            try {
                const { authorization: userId } = req.headers

                logic.retrievePosts(userId, (error, posts) => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    req.json(posts)
                })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })
        api.listen(8000, () => logger.info('API listening on port 8000'))
    })
    .catch(error => logger.error(error))