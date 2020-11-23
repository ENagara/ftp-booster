import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Divider, HelperText } from 'react-native-paper';
import WaitDialog from '../components/WaitDialog';
import { auth } from '../configs/Firebase';

type LoginFormProps = {
    switchLogin: () => void;
}
const LoginForm = ({ switchLogin }: LoginFormProps) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [waitVisible, setWeitVisible] = React.useState(false);
    const [operationDirty, setOperationDirty] = React.useState(false);
    const [loginError, setLoginError] = React.useState(false);
    const [, setError] = React.useState();

    /** メールアドレスチェック */
    const eｍailRegexp = new RegExp(/^[\w\-\._]+@[\w\-\._]+\.[A-Za-z]+$/);
    const isEｍail = () => {
        return !eｍailRegexp.test(email);
    }

    /** パスワードチェック */
    const isPassword = () => {
        return password == '';
    }

    /** ログインアクション */
    const loginAction = () => {
        setOperationDirty(true);
        // エラーがある場合は処理しない
        if (isEｍail() || isPassword()) {
            return;
        }

        // スピナー開始
        setWeitVisible(true);
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoginError(false);
            })
            .catch(({ message }) => {
                if (message === 'The password is invalid or the user does not have a password.'
                    || message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                    setLoginError(true);
                } else {
                    setError(() => { throw new Error(message) });
                }
                setWeitVisible(false);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                label='メールアドレス'
                placeholder='ftp.booster@example.com'
                value={email}
                onChangeText={setEmail}
                style={styles.contents}
            />
            <HelperText type='error' visible={isEｍail() && operationDirty}>
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
            <HelperText type='error' visible={isPassword() && operationDirty}>
                パスワードを入力してください。
            </HelperText>
            <Button
                mode='contained'
                onPress={() => loginAction()}
                style={styles.contents}>
                ログイン
            </Button>
            <HelperText type='error' visible={loginError && operationDirty}>
                メールアドレスもしくはパスワードが間違っています。
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
