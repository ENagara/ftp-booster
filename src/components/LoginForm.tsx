import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Divider, HelperText } from 'react-native-paper';

/** actions */
import { signInFirebase } from '../actions/UserDataAction';

/** components */
import WaitDialog from '../components/WaitDialog';

type LoginFormProps = {
    switchLogin: () => void;
}
const LoginForm = ({ switchLogin }: LoginFormProps) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [emailMessage, setEmailMessage] = React.useState<string>();
    const [passwordMessage, setPasswordMessage] = React.useState<string>();
    const [loginErrorMessage, setLoginErrorMessage] = React.useState<string>();

    const [waitVisible, setWeitVisible] = React.useState(false);
    const [operationDirty, setOperationDirty] = React.useState(false);
    const [, setError] = React.useState();

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

    /** ログインアクション */
    const loginAction = () => {
        // 操作済みにする
        setOperationDirty(true);

        // バリデーションチェック
        let validationError = false;
        if (!isEｍail(email)) validationError = true;
        if (!isPassword(password)) validationError = true;

        // エラーが存在する場合、以降の処理を実施しない
        if (validationError) {
            // ログインエラーメッセージを初期化
            setLoginErrorMessage('');
            return;
        }
        // スピナー開始
        setWeitVisible(true);
        // ログイン処理
        signInFirebase(email, password)
            .catch(error => {
                if (error.code) {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setLoginErrorMessage('無効なメールアドレスです');
                            break;
                        case 'auth/user-disabled':
                            setLoginErrorMessage('アカウントがロックされています。お問い合わせください。');
                            break;
                        case 'auth/user-not-found':
                        case 'auth/wrong-password':
                            setLoginErrorMessage('メールアドレスもしくはパスワードが間違っています。');
                            break;
                        default:
                            setError(() => { throw new Error(error) });
                    }
                } else {
                    setError(() => { throw new Error(error) });
                }
                // スピナー停止
                setWeitVisible(false);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                label='メールアドレス'
                placeholder='ftp.booster@example.com'
                value={email}
                onChangeText={changeEmail}
                style={styles.contents}
            />
            <HelperText type='error' visible={operationDirty}>
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
            <HelperText type='error' visible={operationDirty}>
                {passwordMessage}
            </HelperText>
            <Button
                mode='contained'
                onPress={() => loginAction()}
                style={styles.contents}>
                ログイン
            </Button>
            <HelperText type='error' visible={operationDirty}>
                {loginErrorMessage}
            </HelperText>

            <Divider style={styles.contents} />

            <Button
                mode='text'
                onPress={() => switchLogin()}
                style={styles.contents}>
                メールアドレスで登録
            </Button>
            <WaitDialog visible={waitVisible}></WaitDialog>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    contents: {
        marginTop: 16,
    }
});

export default LoginForm;
