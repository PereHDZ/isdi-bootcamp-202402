import express from 'express'
import logic from './logic/index.mjs'

const api = express()

const jsonBodyParser = express.json()

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { username, email, password, confirmedPassword } = req.body

        logic.registerUser(username, email, password, confirmedPassword, error => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message})

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message})
    }
})

api.listen(8000, () => console.log('API listeninig on port 8000'))