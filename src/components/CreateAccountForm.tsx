import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Divider } from 'react-native-paper';

/** components */
import WaitDialog from './WaitDialog';

/** configs */
import { auth, dbh } from '../configs/Firebase';

type CreateAccountFormProps = {
    switchLogin: () => void;
}
const CreateAccountForm = ({ switchLogin }: CreateAccountFormProps) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const [waitVisible, setWeitVisible] = React.useState(false);
    const [, setError] = React.useState();

    const createUser = async () => {
        let errormsg: string = '';
        // スピナー開始
        setWeitVisible(true);
        // ユーザの作成
        await createUserAuthentication()
            .then(searchFirestoreUser)
            .then((userExists) => deleteUserAuthentication(userExists))
            .then(createUserFirestore)
            .then(reauthenticateAsync)
            .catch(error => {
                errormsg = error;
            });
        if (errormsg) {
            setError(() => { throw new Error(errormsg) });
        }
    }

    /** firebaseのAuthenticationにユーザを作成 */
    const createUserAuthentication = () => {
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // ユーザの作成成功
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    /** 
     * firestoreのユーザ情報を検索
     * true: firestoreにユーザ情報が存在する
     * false: firestoreにユーザ情報が存在しない
     */
    const searchFirestoreUser = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            dbh.collection('users').doc(auth.currentUser?.uid).get().then((doc) => {
                if (doc.exists) {
                    // ユーザ情報が存在する場合
                    resolve(true);
                } else {
                    // ユーザ情報が存在しない場合
                    resolve(false);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /** firebaseのAuthenticationからユーザを削除 */
    const deleteUserAuthentication = (userExists: boolean) => {
        return new Promise((resolve, reject) => {
            // ユーザが存在しない場合、処理しない
            if (!userExists) {
                resolve();
            } else {
                // ユーザが存在する場合、Authenticationからユーザを削除する
                auth.currentUser?.delete().then(() => {
                    reject('ユーザ情報作成処理で失敗しました。');
                }).catch((error) => {
                    reject(error);
                });
            }
        });
    }

    /** firestoreにユーザ情報を追加 */
    const createUserFirestore = () => {
        return new Promise((resolve, reject) => {
            dbh.collection('users').doc(auth.currentUser?.uid).set({
                displayName: name,
                email: email
            }).then(() => {
                // firestore追加成功
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /** 再認証処理 */
    const reauthenticateAsync = () => {
        return new Promise((resolve, reject) => {
            auth.signOut()
                .then(() => auth.signInWithEmailAndPassword(email, password))
                .then(resolve)
                .catch((error) => {
                    reject(error);
                });
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>アカウントを作成する</Text>
            <TextInput
                label='ユーザ名'
                placeholder='ftp'
                value={name}
                onChangeText={setName}
                style={styles.contents}
            />
            <TextInput
                label='メールアドレス'
                placeholder='ftp.booster@example.com'
                value={email}
                onChangeText={setEmail}
                style={styles.contents}
            />
            <TextInput
                label='パスワード'
                placeholder='********'
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.contents}
            />
            <TextInput
                label='パスワード(確認) '
                placeholder='********'
                value={passwordConfirm}
                secureTextEntry={true}
                onChangeText={setPasswordConfirm}
                style={styles.contents}
            />
            <Button
                mode="contained"
                onPress={() => createUser()}
                style={styles.contents}>
                登録
            </Button>

            <Divider style={styles.contents} />

            <Button
                mode="text"
                onPress={() => switchLogin()}
                style={styles.contents}>
                戻る
            </Button>
            <WaitDialog visible={waitVisible}></WaitDialog>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    contents: {
        marginTop: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        textAlign: 'center'
    }
});

export default CreateAccountForm;
