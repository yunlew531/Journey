const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { firestoreDb, fireAuth } = require('../../connections/firebase_connect')
const continentsRef = firestoreDb.collection('continents')

const checkAuth = (req, res, next) => {
  fireAuth.onAuthStateChanged((user) => {
    if (user.uid === process.env.ADMIN_UID) {
      return next()
    } else if (user.uid === process.env.ADMIN_READ_ONLY_UID) {
      res.status(400).send({
        success: false,
        message: '此帳戶僅有唯讀功能'
      })
    } else {
      res.status(400).send({
        success: false,
        message: '此帳戶無此權限'
      })
    }
  })
}

router.post(
  '/create',
  checkAuth,
  body('title')
    .notEmpty()
    .withMessage('請檢查標題是否空白')
    .isString()
    .withMessage('標題需為 string 格式'),
  body('description')
    .notEmpty()
    .withMessage('請檢查簡介是否空白')
    .isString()
    .withMessage('簡介需為 string 格式'),
  body('photo')
    .notEmpty()
    .withMessage('請檢查圖片是否空白'),
  body('content')
    .notEmpty()
    .withMessage('請檢查內容是否空白')
    .isString()
    .withMessage('內容需為 string 格式'),
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

    const { title, description, content, photo } = req.body
    const continentRef = continentsRef.doc()
    const { id } = continentRef
    continentRef
      .set({
        id,
        title,
        description,
        content,
        photo
      })
      .then(() => {
        res.send({
          success: true,
          message: '地區新增成功'
        })
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: '請求失敗，資料無法新增'
        })
      })
  }
)

router.post(
  '/update/:id',
  checkAuth,
  body('title')
    .notEmpty()
    .withMessage('請檢查標題是否空白')
    .isString()
    .withMessage('標題需為 string 格式'),
  body('description')
    .notEmpty()
    .withMessage('請檢查簡介是否空白')
    .isString()
    .withMessage('簡介需為 string 格式'),
  body('photo')
    .notEmpty()
    .withMessage('請檢查圖片是否空白'),
  body('content')
    .notEmpty()
    .withMessage('請檢查內容是否空白')
    .isString()
    .withMessage('內容需為 string 格式'),
  (req, res) => {
    const { id } = req.params
    const continent = req.body

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

    continentsRef
      .doc(id)
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          throw new Error('not exists')
        } else {
          return continentsRef.doc(id).update(continent)
        }
      })
      .then(() => {
        res.send({
          success: true,
          message: '成功更新內容'
        })
      })
      .catch((err) => {
        const success = false
        let status = 500
        let message = ''

        switch (err.message) {
          case 'not exists':
            status = 400
            message = '資料不存在，請檢查id'
            break
          default:
            message = '請求失敗，資料無法更新'
        }

        res.status(status).send({
          success,
          message
        })
      })
  }
)

router.delete('/:id', checkAuth, (req, res) => {
  const { id } = req.params

  continentsRef
    .doc(id)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        throw new Error('not exists')
      } else {
        return continentsRef.doc(id).delete()
      }
    })
    .then(() => {
      res.send({
        success: true,
        message: '成功刪除地區'
      })
    })
    .catch((err) => {
      const success = false
      let status = 500
      let message = ''

      switch (err.message) {
        case 'not exists':
          status = 400
          message = '資料不存在，請檢查id'
          break
        default:
          message = '請求失敗，資料無法刪除'
      }

      res.status(status).send({
        success,
        message
      })
    })
})

module.exports = router
