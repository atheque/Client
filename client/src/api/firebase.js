import { initializeApp } from "firebase";

var app = initializeApp({
  apiKey: 'AIzaSyAj8TCcNMWrghgYi_G6q0QMzk1eq86t0m8',
  authDomain: 'atheque-6dbb6.firebaseapp.com',
  databaseURL: 'https://atheque-6dbb6.firebaseio.com',
  projectId: 'atheque-6dbb6',
  storageBucket: 'atheque-6dbb6.appspot.com',
  messagingSenderId: '101334149001'
});
  
const db = app.firestore()

export default db

