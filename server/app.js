const express = require('express')
const app = express()
require('dotenv').config()

// router "/"
const homeRouter = require('./routes/index/home')
const loginRouter = require('./routes/index/login')
const adminContinentsRouter = require('./routes/admin/continents')

// router "/member"

// router "/admin"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRouter)
app.use('/login', loginRouter)

app.use('/admin/continents', adminContinentsRouter)

module.exports = app
