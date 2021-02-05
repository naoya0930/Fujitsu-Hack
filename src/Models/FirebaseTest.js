import firebase from 'firebase';

const config = {
//ここから
    apiKey: "AIzaSyCiIN5yybGML58fbA0Ia41Be6Ua8cMT09s",
    authDomain: "fujitsu-hack-53803g.firebaseapp.com",
    projectId: "fujitsu-hack-53803g",
    storageBucket: "fujitsu-hack-53803g.appspot.com",
    messagingSenderId: "583761359383",
    appId: "1:583761359383:web:b478f964c0beba29d16252",
    measurementId: "G-PGG490CGCK"
//ここまでコピーして書き換え
};
const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();