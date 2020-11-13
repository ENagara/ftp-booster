import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { auth } from '../configs/Firebase';

const LoginScreen = () => {
    // true: ログイン, false: アカウント作成
    const [login, setLogin] = React.useState(true);
    const switchLogin = () => setLogin(!login);

    return (
        login
            ? <LoginForm switchLogin={switchLogin}></LoginForm>
            : <CreateAccountForm switchLogin={switchLogin}></CreateAccountForm>
    )
}

type LoginFormProps = {
    switchLogin: () => void;
}
const LoginForm = ({ switchLogin }: LoginFormProps) => {
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = () => {
        auth.signInWithEmailAndPassword(mail, password)
            .then(() => {
                console.log('ログイン成功');
            }).catch(({ message }) => {
                console.log(message);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                label='メールアドレス'
                placeholder='ftp.booster@example.com'
                value={mail}
                onChangeText={setMail}
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
            <Button
                mode="contained"
                onPress={() => login()}
                style={styles.contents}>
                ログイン
            </Button>

            <Divider style={styles.contents} />

            <Button
                mode="text"
                onPress={() => switchLogin()}
                style={styles.contents}>
                メールアドレスで登録
            </Button>
        </View>
    )
}

type CreateAccountFormProps = {
    switchLogin: () => void;
}
const CreateAccountForm = ({ switchLogin }: CreateAccountFormProps) => {
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const createUser = () => {
        auth.createUserWithEmailAndPassword(mail, password)
            .then(() => {
                console.log('ユーザの作成成功');
            }).catch(({ message }) => {
                console.log(message);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>アカウントを作成する</Text>
            <TextInput
                label='メールアドレス'
                placeholder='ftp.booster@example.com'
                value={mail}
                onChangeText={setMail}
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

export default LoginScreen;
