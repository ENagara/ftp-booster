import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Divider, HelperText } from 'react-native-paper';

/** actions */
import { createFirebaseUser } from '../actions/UserDataAction';

/** components */
import WaitDialog from './WaitDialog';

type CreateAccountFormProps = {
    switchLogin: () => void;
}
const CreateAccountForm = ({ switchLogin }: CreateAccountFormProps) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const [nameMessage, setNameMessage] = React.useState<string>();
    const [emailMessage, setEmailMessage] = React.useState<string>();
    const [passwordMessage, setPasswordMessage] = React.useState<string>();
    const [passwordConfirmMessage, setPasswordConfirmMessage] = React.useState<string>();

    const [waitVisible, setWeitVisible] = React.useState(false);
    const [operationDirty, setOperationDirty] = React.useState(false);
    const [, setError] = React.useState();

    /** ユーザ名変更 */
    const nameChange = (name: string) => {
        setName(name);
        if (operationDirty) isName(name);
    }

    /** メールアドレス変更 */
    const changeEmail = (email: string) => {
        setEmail(email);
        if (operationDirty) isEｍail(email);
    }

    /** パスワード変更 */
    const changePassword = (password: string) => {
        setPassword(password);
        if (operationDirty) isPassword(password);
    }

    /** パスワード確認変更 */
    const changePasswordConfirm = (passwordConfirm: string) => {
        setPasswordConfirm(passwordConfirm);
        if (operationDirty) isPasswordConfirm(passwordConfirm);
    }

    /** ユーザ名チェック */
    const nameRegexp = new RegExp(/^.{1,20}$/);
    const isName = (name: string) => {
        const result = nameRegexp.test(name);
        if (result) {
            setNameMessage('');
        } else {
            setNameMessage('20文字以内で入力してください');
        }
        return result;
    }

    /** メールアドレスチェック */
    const eｍailRegexp = new RegExp(/^[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+$/);
    const isEｍail = (email: string) => {
        const result = eｍailRegexp.test(email);
        if (result) {
            setEmailMessage('');
        } else {
            setEmailMessage('メールアドレスを入力してください');
        }
        return result;
    }

    /** パスワードチェック */
    const passwordRegexp = new RegExp(/^[A-Za-z\d]{6,32}$/);
    const isPassword = (password: string) => {
        const result = passwordRegexp.test(password);
        if (result) {
            setPasswordMessage('');
        } else {
            setPasswordMessage('パスワードは半角英数の6～32文字で入力してください');
        }
        return result;
    }

    /** パスワード確認チェック */
    const isPasswordConfirm = (passwordConfirm: string) => {
        const result = password === passwordConfirm;
        if (result) {
            setPasswordConfirmMessage('');
        } else {
            setPasswordConfirmMessage('パスワードが異なっています');
        }
        return result;
    }

    const createUser = async () => {
        // 操作済みにする
        setOperationDirty(true);

        // バリデーションチェック
        let validationError = false;
        if (!isName(name)) validationError = true;
        if (!isEｍail(email)) validationError = true;
        if (!isPassword(password)) validationError = true;
        if (!isPasswordConfirm(passwordConfirm)) validationError = true;

        // エラーが存在する場合、以降の処理を実施しない
        if (validationError) return;

        // スピナー開始
        setWeitVisible(true);
        // ユーザの作成
        createFirebaseUser(name, email, password)
            .catch(error => {
                if (error.code) {
                    switch (error?.code) {
                        case 'auth/email-already-in-use':
                            setEmailMessage('登録済みのメールアドレスです');
                            break;
                        case 'auth/weak-password':
                            setEmailMessage('脆弱なパスワードです');
                            break;
                        default:
                            setError(() => { throw new Error(error) });
                    }
                } else {
                    setError(() => { throw new Error(error) });
                }
                setWeitVisible(false);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>アカウントを作成する</Text>
            <TextInput
                label='ユーザ名'
                placeholder='Jhon'
                value={name}
                maxLength={30}
                onChangeText={nameChange}
                style={styles.contents}
            />
            <HelperText type="error" visible={operationDirty}>
                {nameMessage}
            </HelperText>

            <TextInput
                label='メールアドレス'
                placeholder='ftp.booster@example.com'
                value={email}
                onChangeText={changeEmail}
                style={styles.contents}
            />
            <HelperText type="error" visible={operationDirty}>
                {emailMessage}
            </HelperText>

            <TextInput
                label='パスワード'
                placeholder='********'
                value={password}
                secureTextEntry={true}
                onChangeText={changePassword}
                style={styles.contents}
            />
            <HelperText type="error" visible={operationDirty}>
                {passwordMessage}
            </HelperText>
            <TextInput
                label='パスワード(確認) '
                placeholder='********'
                value={passwordConfirm}
                secureTextEntry={true}
                onChangeText={changePasswordConfirm}
                style={styles.contents}
            />
            <HelperText type="error" visible={operationDirty}>
                {passwordConfirmMessage}
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
