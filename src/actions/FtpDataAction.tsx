import { FtpDataParam } from '../configs/Types';
import { dbh, auth } from '../configs/Firebase';

/** 記録した全データを取得（降順） */
export const GetFtpDataList = async (): Promise<FtpDataParam[]> => {
    return new Promise((resolve, reject) => {
        dbh.collection("users").doc(auth.currentUser?.uid).collection("ftpdata").get().then((snap) => {
            let ftpDataListWk: FtpDataParam[] = [];
            snap.forEach((doc) => {
                ftpDataListWk.push({
                    no: doc.data().no,
                    type: doc.data().type,
                    date: doc.data().date,
                    ftp: doc.data().ftp,
                    weight: doc.data().weight,
                    condition: doc.data().condition,
                    message: doc.data().message,
                });
            });
            let result = ftpDataListWk.sort((a, b) => {
                return a.no > b.no ? 1 : -1;
            });
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        });
    });
}
