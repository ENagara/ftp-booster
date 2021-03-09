import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Image, StyleSheet, View } from 'react-native';

/** configs */
import { EmailAuth, GoogleAuth, FacebookAuth, TwitterAuth, auth } from '../configs/Firebase';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        EmailAuth,
        GoogleAuth,
        FacebookAuth,
        TwitterAuth,
    ],
}

const SignInScreen = () => {
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
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </>

    );
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        paddingTop: 64,
    },
});

export default SignInScreen;
