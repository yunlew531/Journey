const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const {
  fireStorage,
  firestoreDb
} = require('../../connections/firebase_connect')
const photoWallRef = firestoreDb.collection('photo_wall')

router.post('/upload', upload.single('img-file'), (req, res) => {
  const imgFile = req.file
  const { index } = req.body
  const fileExtension = imgFile.originalname.split('.').pop()

  if (fileExtension !== 'jpg') {
    res.status(400).send({
      success: false,
      message: '圖片只能是 jpg 格式'
    })
    return
  }

  const photoWallStorageRef = fireStorage.ref('/photo_wall')
  const imgRef = photoWallStorageRef.child(req.file.originalname)

  let imgUrl = ''
  imgRef
    .put(imgFile.buffer, {
      contentType: imgFile.mimetype
    })
    .then(() => imgRef.getDownloadURL())
    .then((url) => {
      imgUrl = url
      return photoWallRef.doc('front_photos').update({
        [`photo-${index}`]: imgUrl
      })
    })
    .then(() => {
      res.send({
        success: true,
        message: '上傳成功',
        imgUrl
      })
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message: err.message
      })
    })
})

module.exports = router
