import { dbh, auth } from '../configs/Firebase';

/** firebaseにユーザを作成 */
export const createFirebaseUser = (name: string, email: string, password: string) => {
    return new Promise((resolve, reject) => {
        createUserAuthentication(email, password)
            .then(existsFirestoreUser)
            .then(userExists => deleteUserAuthentication(userExists))
            .then(() => createUserFirestore(name, email))
            .then(() => reauthenticateAsync(email, password))
            .then(resolve)
            .catch(error => reject(error));
    });
}

/** firebaseにサインイン */
export const signInFirebase = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                if (error.code === 'auth/invalid-email'
                    || error.code === 'auth/user-disabled'
                    || error.code === 'auth/user-not-found'
                    || error.code === 'auth/wrong-password') {
                    reject(error);
                }
                reject(() => { throw new Error(error) });
            });
    });
}

/** firebaseのAuthenticationにユーザを作成 */
const createUserAuthentication = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                // ユーザの作成成功
                resolve();
            }).catch(error => {
                if (error.code === 'auth/email-already-in-use'
                    || error.code === 'auth/weak-password'
                    || error.code === 'auth/invalid-email') {
                    reject(error);
                }
                reject(() => { throw new Error(error) });
            });
    });
}

/**
 * firestoreのユーザ情報を検索
 * true: firestoreにユーザ情報が存在する
 * false: firestoreにユーザ情報が存在しない
 */
const existsFirestoreUser = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).get().then(doc => {
            resolve(doc.exists);
        }).catch(error => {
            reject(() => { throw new Error(error) });
        });
    });
}

/** firebaseのAuthenticationからユーザを削除 */
const deleteUserAuthentication = (userExists: boolean) => {
    return new Promise((resolve, reject) => {
        if (userExists) {
            // ユーザが存在する場合、Authenticationからユーザを削除する
            auth.currentUser?.delete().then(() => {
                // delete処理が正常に終わってもエラーとする
                reject(() => { throw new Error('ユーザ情報作成処理で失敗しました。') });
            }).catch(error => {
                reject(() => { throw new Error(error) });
            });
        } else {
            // ユーザが存在しない場合、処理しない
            resolve();
        }
    });
}

/** firestoreにユーザ情報を追加 */
const createUserFirestore = (name: string, email: string) => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).set({
            displayName: name,
            email: email
        }).then(() => {
            // firestore追加成功
            resolve();
        }).catch(error => {
            reject(() => { throw new Error(error) });
        });
    });
}


/** 再認証処理 */
const reauthenticateAsync = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        auth.signOut()
            .then(() => auth.signInWithEmailAndPassword(email, password))
            .then(resolve)
            .catch(error => {
                reject(() => { throw new Error(error) });
            });
    });
}
