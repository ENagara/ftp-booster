import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Divider } from 'react-native-paper';
import WaitDialog from '../components/WaitDialog';
import { auth } from '../configs/Firebase';

type LoginFormProps = {
    switchLogin: () => void;
}
const LoginForm = ({ switchLogin }: LoginFormProps) => {
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [waitVisible, setWeitVisible] = React.useState(false);

    const login = () => {
        // スピナー開始
        setWeitVisible(true);
        auth.signInWithEmailAndPassword(mail, password)
            .then(() => {
                console.log('ログイン成功');
                // スピナーを停止
                setWeitVisible(false);
            }).catch(({ message }) => {
                // スピナーを停止
                console.log(message);
                setWeitVisible(false);
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
            <WaitDialog visible={waitVisible}></WaitDialog>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    contents: {
        marginTop: 16,
        marginBottom: 16,
    }
});

export default LoginForm;
