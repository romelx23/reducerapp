import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCNH-IjG7tewjEmPVgkIW9a_9WVqOBpmPc",
    authDomain: "react-app-redux-ce73a.firebaseapp.com",
    projectId: "react-app-redux-ce73a",
    storageBucket: "react-app-redux-ce73a.appspot.com",
    messagingSenderId: "590456597521",
    appId: "1:590456597521:web:81d517814ca74e3d4c95b0"
  };

  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}