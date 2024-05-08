import mongoose from 'mongoose'
import express from 'express'
import logic from './logic/index.ts'
import { errors } from 'com'
import tracer from 'tracer'
import colors from 'colors'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const { TokenExpiredError } = jwt

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const { 
    SystemError,
    DuplicityError,
    CredentialsError,
    ContentError,
    NotFoundError,
    UnauthorizedError
} = errors

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors())

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { username, email, password, confirmedPassword } = req.body

                logic.registerUser(username, email, password, confirmedPassword)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.warn(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError){
                            logger.warn(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError || error instanceof CredentialsError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => {
                        const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })
    
                        res.json(token)
                    })
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)
    
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)
    
                            res.status(400).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId as string, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })



        api.get('/races', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveRaces(userId as string)
                    .then(races => res.json(races))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.get('/races/:raceId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { raceId } = req.params

                logic.retrieveRace(userId as string, raceId)
                    .then(race => res.json(race))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/rootraces', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveParentRaces(userId as string)
                    .then(races => res.json(races))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })
        
        api.get('/races/:raceId/subraces', (req, res) => {
            debugger
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { raceId } = req.params

                logic.retrieveSubracesFromRace(userId as string, raceId)
                    .then(races => res.json(races))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })



        api.get('/classes', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveCharacterClasses(userId as string)
                    .then(characterClasses => res.json(characterClasses))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.get('/classes/:characterClassId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { characterClassId } = req.params

                logic.retrieveCharacterClass(userId as string, characterClassId)
                    .then(characterClasses => res.json(characterClasses))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/rootclasses', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveParentCharacterClasses(userId as string)
                    .then(characterClasses => res.json(characterClasses))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.get('/classes/:characterClassId/subclasses', (req, res) => {
            debugger
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { characterClassId } = req.params

                logic.retrieveSubclassesFromClass(userId as string, characterClassId)
                    .then(characterClasses => res.json(characterClasses))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })



        api.get('/classactions/:classActionId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { classActionId } = req.params

                logic.retrieveClassAction(userId as string, classActionId)
                    .then(race => res.json(race))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })



        api.get('/backgrounds', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveBackgrounds(userId as string)
                    .then(backgrounds => res.json(backgrounds))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.get('/backgrounds/:backgroundId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { backgroundId } = req.params

                logic.retrieveBackground(userId as string, backgroundId)
                    .then(race => res.json(race))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })



        api.get('/cantrips/:cantripId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cantripId } = req.params

                logic.retrieveCantrip(userId as string, cantripId)
                    .then(race => res.json(race))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })



        api.get('/spells/:spellId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { spellId } = req.params

                logic.retrieveSpell(userId as string, spellId)
                    .then(race => res.json(race))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })



        api.get('/deities', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveDeities(userId as string)
                    .then(deities => res.json(deities))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError){
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })


        api.listen(PORT, () => logger.info(`API listening on port ${PORT}`))
    })
    
    .catch(error => logger.error(error))