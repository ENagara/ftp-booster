import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    databaseURL: 'databaseURL',
    projectId: 'projectId',
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

export default firebase;
