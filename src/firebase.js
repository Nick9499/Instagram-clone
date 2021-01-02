import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAbzSTt4WqwcFzW16v5SC4qqGFaCoxeFms",
    authDomain: "instagram-clone-9309d.firebaseapp.com",
    projectId: "instagram-clone-9309d",
    storageBucket: "instagram-clone-9309d.appspot.com",
    messagingSenderId: "418200416626",
    appId: "1:418200416626:web:bb918fedbd580b532b2deb"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}