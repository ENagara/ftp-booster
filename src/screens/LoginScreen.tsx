import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

/** components */
import LoginForm from '../components/LoginForm';
import CreateAccountForm from '../components/CreateAccountForm';

const LoginScreen = () => {
    // true: ログイン, false: アカウント作成
    const [login, setLogin] = React.useState(true);
    const switchLogin = () => setLogin(!login);

    return (
        <>
            <View style={styles.title}>
                <Image
                    source={require('../../assets/title.png')}
                    style={{
                        width: 280,
                        height: 50,
                    }} />
            </View>
            {login
                // ログイン画面
                ? <LoginForm switchLogin={switchLogin}></LoginForm>
                // アカウント作成画面
                : <CreateAccountForm switchLogin={switchLogin}></CreateAccountForm>
            }
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        paddingTop: 64,
    }
});

export default LoginScreen;
