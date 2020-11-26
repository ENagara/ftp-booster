import React from 'react';
import { View, StyleSheet } from 'react-native';

/** components */
import EntryDialog from '../components/EntryDialog';
import FeedComponent from '../components/FeedComponent';

const FeedScreen = () => {
    return (
        <View style={styles.container}>
            <FeedComponent></FeedComponent>
            <EntryDialog></EntryDialog>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default FeedScreen;
