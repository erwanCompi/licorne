// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDCDE07eHLS2Y0vf9jVY3N4LJCHgnidvkU",
    authDomain: "dragon-b4827.firebaseapp.com",
    databaseURL: "https://dragon-b4827.firebaseio.com",
    projectId: "dragon-b4827",
    storageBucket: "dragon-b4827.appspot.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
