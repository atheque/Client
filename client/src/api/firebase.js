import firebase from "firebase"
var config = {
  apiKey: "AIzaSyCDUzHrb8Yu-1NA1IYXRpR8EgGuct3pBrc",
  authDomain: "week3-37a71.firebaseapp.com",
  databaseURL: "https://week3-37a71.firebaseio.com",
  projectId: "week3-37a71",
  storageBucket: "",
  messagingSenderId: "214344873840"
};
firebase.initializeApp(config);
const db = firebase.firestore()

// var database = firebase.database()

export default db
