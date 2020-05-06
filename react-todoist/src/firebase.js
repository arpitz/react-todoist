import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBZcpmUxc_HnwHnTfvemk3PwM_-KLmQgSc",
  authDomain: "react-todoist-b5c17.firebaseapp.com",
  databaseURL: "https://react-todoist-b5c17.firebaseio.com",
  projectId: "react-todoist-b5c17",
  storageBucket: "react-todoist-b5c17.appspot.com",
  messagingSenderId: "589078319224",
  appId: "1:589078319224:web:560e7d08bc49e228f69d8d"
})

export { firebaseConfig as firebase };