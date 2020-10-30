import { FtpDataParam } from '../configs/Types';
import dbh from '../configs/Firebase';

/** データを取得 */
export const GetFtpDataList = async (): Promise<FtpDataParam[]> => {
    let ftpDataListWk: FtpDataParam[] = [];
    let a = await dbh.collection("users").doc("user1").collection("ftpdata").get().then((snap) => {
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
        return ftpDataListWk.sort((a, b) => {
            return a.no > b.no ? 1 : -1;
        });
    });
    return Promise.resolve(a);
}
