const express = require('express')
const router = express.Router()
const { firestoreDb } = require('../connections/firebase_connect')
const continentsRef = firestoreDb.collection('continents')

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

module.exports = router
