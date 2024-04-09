import express from 'express'
import logic from './logic/index.js'

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

        logic.loginUser(username, password, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params
        logic.retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(404).json({ error: error.constructor.name, message: error.message})
    }
})

/*api.patch('/users/:userId', jsonBodyParser, (req, res) => {
    try {
        const { userId } = req.params
        logic.retrieveUser
    }
})*/

api.listen(8000, () => console.log('API listeninig on port 8000'))