import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfc_vFYP6a-251wX7I50FE1hm3p1gn0NE",
    authDomain: "ftpbooster.firebaseapp.com",
    databaseURL: "https://ftpbooster.firebaseio.com",
    projectId: "ftpbooster",
    storageBucket: "ftpbooster.appspot.com",
    messagingSenderId: "117117810866",
    appId: "1:117117810866:web:b8d2b6f6f2cf9c7402b1ab",
    measurementId: "G-W8HG7XGF5C"
};

firebase.initializeApp(firebaseConfig);

/** firestore */
export const dbh = firebase.firestore();

/** 認証 */
export const auth = firebase.auth();
export const GoogleAuth = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
export const EmailAuth = firebase.auth.EmailAuthProvider.PROVIDER_ID;
export const TwitterAuth = firebase.auth.TwitterAuthProvider.PROVIDER_ID;
export const FacebookAuth = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
export default firebase;
