const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()

// router "/"
const homeRouter = require('./routes/index/home')
const loginRouter = require('./routes/index/login')
const photoRouter = require('./routes/admin/photo')

// router "/member"

// router "/admin"
const adminContinentsRouter = require('./routes/admin/continents')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRouter)
app.use('/login', loginRouter)

const checkAuth = (req, res, next) => {
  const { ADMIN_UID, ADMIN_READ_ONLY_UID, JWT_PRIVATE_KEY } = process.env
  const { authorization: token } = req.headers

  try {
    const { uid } = jwt.verify(token, JWT_PRIVATE_KEY)

    if (
      uid === ADMIN_UID ||
      (uid === ADMIN_READ_ONLY_UID && req.method === 'GET')
    ) {
      next()
    } else if (uid === ADMIN_READ_ONLY_UID) {
      throw new Error('read only')
    } else {
      throw new Error('permission denied')
    }
  } catch (err) {
    const { message: errMsg } = err
    let message = ''

    switch (errMsg) {
      case 'jwt must be provided':
        message = 'token 不存在，請檢查 header 是否夾帶'
        break
      case 'jwt expired':
        message = 'token 過期，請重新登入'
        break
      case 'read only':
        message = '此帳戶僅有唯讀功能'
        break
      case 'permission denied':
        message = '此帳戶無此權限'
        break
      case 'jwt malformed':
        message = 'token 格式有誤'
        break
      default:
        message = '請重新登入'
    }

    res.status(400).send({
      success: false,
      message
    })
  }
}

app.use('/admin', checkAuth)

app.use('/admin/continents', adminContinentsRouter)
app.use('/admin/photo', photoRouter)

module.exports = app
