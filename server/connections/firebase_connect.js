const firebase = require('firebase')

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const firestoreDb = firebase.firestore()
const fireAuth = firebase.auth()
const fireStorage = firebase.storage()

module.exports = {
  firestoreDb,
  fireAuth,
  fireStorage
}
