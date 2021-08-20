const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/test-server', (req, res) => {
  console.log(req.body)
  res.send({
    success: true,
    message: 'create server success'
  })
})

module.exports = app
