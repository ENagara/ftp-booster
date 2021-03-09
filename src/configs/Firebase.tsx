import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    databaseURL: 'databaseURL',
    projectId: 'ftpbooster',
    storageBucket: 'storageBucket',
    messagingSenderId: 'messagingSenderId',
    appId: 'appId',
    measurementId: 'measurementId',
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
