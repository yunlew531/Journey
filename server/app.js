const express = require('express')
const app = express()
require('dotenv').config()

const indexRouter = require('./routes/index')
const adminContinentsRouter = require('./routes/admin/continents')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', indexRouter)
app.use('/admin/continents', adminContinentsRouter)

module.exports = app
