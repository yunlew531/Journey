const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { firestoreDb, fireAuth } = require('../../connections/firebase_connect')
const usersRef = firestoreDb.collection('users')

const checkPhoneFormat = (phoneNumber) => {
  const telRegex = /^09[0-9]{8}$/
  return telRegex.test(phoneNumber)
}

router.post(
  '/register',
  body('email')
    .isEmail()
    .withMessage('請檢查Email格式是否正確'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密碼長度不得小於6')
    .isString()
    .withMessage('密碼需為 string 格式'),
  body('name')
    .notEmpty()
    .withMessage('請檢查名字是否空白')
    .isString()
    .withMessage('名字需為 string 格式'),
  body('phone')
    .custom(checkPhoneFormat)
    .withMessage('請檢查手機格式是否正確'),
  body('address')
    .isString()
    .withMessage('請檢查地址格式是否正確')
    .isLength({ min: 6 })
    .withMessage('地址長度不得小於6'),
  (req, res) => {
    const errorFormatter = ({ msg }) => `${msg}`
    const errors = validationResult(req).formatWith(errorFormatter)
    const hasError = !errors.isEmpty()

    if (hasError) {
      res.status(400).send({
        success: false,
        message: errors.array()
      })
      return
    }

    const user = req.body
    const { email, password } = user

    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { uid, metadata } = userCredential.user
        const userRef = usersRef.doc(uid)
        user.uid = uid
        user.creationTime = Math.floor(new Date(metadata.creationTime) / 1000)
        user.authority = 'normal'
        return userRef.set(user)
      })
      .then(() => {
        res.send({
          success: true,
          message: '已完成註冊'
        })
      })
      .catch((err) => {
        const errCode = err.code
        let code = 400
        let message = ''

        switch (errCode) {
          case 'auth/email-already-in-use':
            message = '此帳號已存在'
            break
          case 'auth/invalid-email':
            message = '信箱格式錯誤'
            break
          case 'auth/weak-password':
            message = '密碼強度太弱'
            break
          default:
            code = 500
            message = '目前無法註冊，請稍後再嘗試'
        }

        res.status(code).send({
          success: false,
          message
        })
      })
  }
)

router.post(
  '/',
  body('email')
    .isEmail()
    .withMessage('請檢查信箱格式'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密碼長度錯誤'),
  (req, res) => {
    const errorFormatter = ({ msg }) => `${msg}`
    const errors = validationResult(req).formatWith(errorFormatter)
    const hasError = !errors.isEmpty()

    if (hasError) {
      res.status(400).send({
        success: false,
        message: errors.array()
      })
      return
    }

    const { email, password } = req.body

    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((UserCredential) => {
        const { user } = UserCredential
        const { _lat: token, uid } = user

        res.send({
          success: true,
          message: '成功登入',
          user: {
            token,
            uid
          }
        })
      })
      .catch((err) => {
        const errorCode = err.code
        let code = 400
        let message = ''

        switch (errorCode) {
          case 'auth/invalid-email':
            message = '請檢查信箱格式'
            break
          case 'auth/user-disabled':
            message = '此帳戶已被禁用'
            break
          case 'auth/user-not-found':
            message = '無此帳戶'
            break
          case 'auth/wrong-password':
            message = '密碼錯誤'
            break
          default:
            code = 500
            message = '目前無法登入，請稍後再嘗試'
        }

        res.status(code).send({
          success: false,
          message
        })
      })
  }
)

router.post('/check', (req, res) => {
  const { authorization: token } = req.headers

  fireAuth.onAuthStateChanged((user) => {
    if (user && user._lat !== token) {
      res.status(400).send({
        success: false,
        message: '請重新登入'
      })
      return
    }

    if (user) {
      console.log(user)
      res.send({
        success: true,
        user,
        message: '已登入'
      })
    } else {
      res.send({
        success: false,
        message: '請重新登入'
      })
    }
  })
})

router.post('/admin/check', (req, res) => {
  const { authorization: token } = req.headers
  const { ADMIN_UID, ADMIN_READ_ONLY_UID } = process.env

  fireAuth.onAuthStateChanged((user) => {
    let code = 400
    let message = ''
    let success = false

    if (!user) {
      message = '尚未登入'
    } else if (user._lat !== token) {
      message = 'token過期，請重新登入'
    } else if (user.uid === ADMIN_UID || user.uid === ADMIN_READ_ONLY_UID) {
      success = true
      code = 200
      message = '已登入管理員'
      user = user.uid
    } else if (user.uid !== ADMIN_UID || user.uid !== ADMIN_READ_ONLY_UID) {
      message = '您的帳戶權限不足'
    } else {
      message = '請重新登入'
    }

    res.status(code).send({
      success,
      message,
      user
    })
  })
})

router.post('/signOut', (req, res) => {
  fireAuth
    .signOut()
    .then(() => {
      res.send({
        success: true,
        message: '已登出帳戶'
      })
    })
    .catch(() => {
      res.status(400).send({
        success: false,
        message: '無法登出，請稍後再嘗試'
      })
    })
})

module.exports = router
