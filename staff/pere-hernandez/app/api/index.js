import express from 'express'
import logic from './logic/index.mjs'
import { json } from 'stream/consumers'

const api = express()

const jsonBodyParser = express.json()

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { username, email, password, confirmedPassword } = req.body

        logic.registerUser(username, email, password, confirmedPassword, error => {
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

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        logic.loginUser(username, password, error => {
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

api.get('/users/:userId', jsonBodyParser, (req, res) => {
    try {
        logic.retrieveUser(req.params.userId, (error, user) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            if (!user) {
                res.status(404)
            } else {
                res.status(201).json(user)
            }
        })
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message})
    }
})

api.listen(8000, () => console.log('API listeninig on port 8000'))