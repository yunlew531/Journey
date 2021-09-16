const express = require('express')
const router = express.Router()
const { firestoreDb } = require('../../connections/firebase_connect')
const continentsRef = firestoreDb.collection('continents')
const photosWallRef = firestoreDb.collection('photos_wall')

router.get('/continents/all', (req, res) => {
  const continents = []
  continentsRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      continents.push(doc.data())
    })
    res.send({
      success: true,
      continents
    })
  })
})

router.get('/photos-wall', (req, res) => {
  const photos = {}

  photosWallRef
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        photos[doc.id] = doc.data()
      })

      res.send({
        success: true,
        message: '成功取得資料',
        photos
      })
    })
    .catch((err) => {
      res.send({
        success: false,
        message: '無法取得資料'
      })
    })
})

module.exports = router
