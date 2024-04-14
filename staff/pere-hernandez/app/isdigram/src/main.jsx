import { logger, Logger } from './utils/index.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

logger.level = Logger.DEBUG

ReactDOM.createRoot(document.getElementById('root')).render(<App />)