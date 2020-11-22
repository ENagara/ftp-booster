import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Divider, HelperText } from 'react-native-paper';

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
    const [operationDirty, setOperationDirty] = React.useState(false);
    const [, setError] = React.useState();

    /** ユーザ名チェック */
    const nameRegexp = new RegExp(/^.{1,}$/);
    const isName = () => {
        return !nameRegexp.test(name);
    }

    /** メールアドレスチェック */
    const eｍailRegexp = new RegExp(/^[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+$/);
    const isEｍail = () => {
        return !eｍailRegexp.test(email);
    }

    /** パスワードチェック */
    const passwordRegexp = new RegExp(/^.{6,}$/);
    const isPassword = () => {
        return !passwordRegexp.test(password);
    }

    /** パスワード確認チェック */
    const isPasswordConfirm = () => {
        return password !== passwordConfirm;
    }

    const createUser = async () => {
        setOperationDirty(true);
        // エラーがある場合は処理しない
        if (isName()
            || isEｍail()
            || isPassword()
            || isPasswordConfirm()) {
            return;
        }

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
                placeholder='Jhon'
                value={name}
                onChangeText={setName}
                style={styles.contents}
            />
            <HelperText type="error" visible={isName() && operationDirty}>
                ユーザ名を入力してください。
            </HelperText>
            <TextInput
                label='メールアドレス'
                placeholder='ftp.booster@example.com'
                value={email}
                onChangeText={setEmail}
                style={styles.contents}
            />
            <HelperText type="error" visible={isEｍail() && operationDirty}>
                メールアドレスを入力してください。
            </HelperText>
            <TextInput
                label='パスワード'
                placeholder='********'
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.contents}
            />
            <HelperText type="error" visible={isPassword() && operationDirty}>
                6文字以上で入力してください。
            </HelperText>
            <TextInput
                label='パスワード(確認) '
                placeholder='********'
                value={passwordConfirm}
                secureTextEntry={true}
                onChangeText={setPasswordConfirm}
                style={styles.contents}
            />
            <HelperText type="error" visible={isPasswordConfirm() && operationDirty}>
                パスワードが異なっています。
            </HelperText>
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
        padding: 16,
    },
    contents: {
        marginTop: 16,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
    }
});

export default CreateAccountForm;
