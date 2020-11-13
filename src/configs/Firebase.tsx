import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
};

firebase.initializeApp(firebaseConfig);

export const dbh = firebase.firestore();

export const auth = firebase.auth();

export default firebase;
