import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBNps3RemVjM_IOOeGblYNWDu6BWgKVQIA",
    authDomain: "baby-feeder-uat-185a3.firebaseapp.com",
    databaseURL: "https://baby-feeder-uat-185a3.firebaseio.com",
    projectId: "baby-feeder-uat-185a3",
    storageBucket: "baby-feeder-uat-185a3.appspot.com",
    messagingSenderId: "721296923601",
    appId: "1:721296923601:web:014b2138507e784d5c1ef0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;