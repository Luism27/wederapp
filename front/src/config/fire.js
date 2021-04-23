
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCSdd6XvqQX6Wq5vOUaBhqu2najgJz_39c",
    authDomain: "neurons-f0ef3.firebaseapp.com",
    projectId: "neurons-f0ef3",
    storageBucket: "neurons-f0ef3.appspot.com",
    messagingSenderId: "689189209717",
    appId: "1:689189209717:web:76b5346dc618ad8e5a9a3c",
    measurementId: "G-BDKZCRXY6X"
}

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;
export default fire;