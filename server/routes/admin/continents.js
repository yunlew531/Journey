const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { firestoreDb } = require('../../connections/firebase_connect')
const continentsRef = firestoreDb.collection('continents')

router.post(
  '/create',
  body('title')
    .notEmpty()
    .withMessage('請檢查標題格式是否空白'),
  body('description')
    .notEmpty()
    .withMessage('請檢查內容是否空白'),
  body('photo')
    .notEmpty()
    .withMessage('請檢查圖片是否空白'),
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
          message: '洲地區新增成功'
        })
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: '請求失敗，資料無法新增至資料庫'
        })
      })
  }
)

module.exports = router
