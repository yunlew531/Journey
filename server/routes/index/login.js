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
        console.log(userCredential.user)
        const userRef = usersRef.doc()
        const { id } = userRef
        user.id = id
        user.authority = 'normal'
        return userRef.set(user)
      })
      .then(() => {
        res.send({
          success: true,
          message: '已完成註冊'
        })
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: '無法註冊，請稍後再嘗試'
        })
      })
  }
)

module.exports = router
