const express = require('express')
const router = express.Router()
const { login } = require('../controllers/authController')

// router.use('/register')

router.get('/login', login)

// router.use('/log-out')

module.exports = router