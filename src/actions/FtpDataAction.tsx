import { FtpDataParam } from '../configs/Types';
import { dbh, auth } from '../configs/Firebase';
import firebase from 'firebase';

/** 記録した全データを取得（降順） */
export const getFtpDataList = (): Promise<FtpDataParam[]> => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).collection('ftpdata').orderBy('date', 'desc').get().then((snap) => {
            let result: FtpDataParam[] = [];
            snap.forEach((doc) => {
                result.push({
                    docId: doc.id,
                    no: doc.data().no,
                    type: doc.data().type,
                    date: getFormatDateFirebase(doc.data().date),
                    ftp: doc.data().ftp,
                    weight: doc.data().weight,
                    condition: doc.data().condition,
                    message: doc.data().message,
                });
            });
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
}

/** 前回の体重を取得 */
export const getWeightBefore = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).collection('ftpdata')
            .where('type', '==', 'ftp').orderBy('date', 'desc').limit(1).get().then((snap) => {
                if (snap.docs.length === 0) {
                    resolve(-1);
                } else {
                    resolve(snap.docs[0].data().weight);
                }
            }).catch((error) => {
                reject(error);
            });
    });
}

/** ftpデータを登録 */
export const entryFtp = (ftpData: FtpDataParam) => {
    return new Promise((resolve, reject) => {
        getFtpSeqIncrement()
            .then(no => updateFtpSeq(no))
            .then(no => insertFtpData(no, ftpData))
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
}

/** ftpシーケンス＋１を取得 */
export const getFtpSeqIncrement = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).get().then(snap => {
            if (snap.get('ftpseq') == undefined) {
                // データが存在しない場合0を返却
                resolve(0);
            } else {
                // 番号+1を返却
                resolve(snap.get('ftpseq') + 1);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

/** ftpシーケンスを更新 */
export const updateFtpSeq = (no: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).set({
            ftpseq: no
        }, { merge: true }).then(() => {
            resolve(no);
        }).catch(error => {
            reject(error);
        });
    });
}

/** FTPデータを登録 */
export const insertFtpData = (no: number, ftpData: FtpDataParam): Promise<void> => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).collection('ftpdata').add({
            no: no,
            type: ftpData.type,
            date: getFormatDateTs(ftpData.date),
            ftp: ftpData.ftp,
            weight: ftpData.weight,
            condition: ftpData.condition,
        }).then(() => {
            resolve();
        }).catch(error => {
            reject(error);
        });
    });
}

/** FTPデータを削除 */
export const deleteFtpData = (docId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        dbh.collection('users').doc(auth.currentUser?.uid).collection('ftpdata').doc(docId).delete()
            .then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            });
    });
}

/** firestore.TimestampからDate型 */
const getFormatDateFirebase = (firebaseDate: firebase.firestore.Timestamp) => {
    return firebaseDate.toDate();
}

/** Date型からfirestore.Timestamp */
const getFormatDateTs = (tsDate: Date) => {
    return firebase.firestore.Timestamp.fromDate(tsDate);
}
