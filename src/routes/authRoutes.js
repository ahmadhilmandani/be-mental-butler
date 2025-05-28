const express = require('express')
const router = express.Router()
const { login, register } = require('../controllers/authController')

router.post('/register', register)

router.get('/login', login)

// router.use('/log-out')

module.exports = router