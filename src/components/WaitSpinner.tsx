import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

/** 処理中のぐるぐる */
const WaitSpinner = () => {
    return (
        <View style={styles.container}>
            <Spinner size='giant' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WaitSpinner;
