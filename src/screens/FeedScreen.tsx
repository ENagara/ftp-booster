import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

/** components */
import EntryDialog from '../components/EntryDialog';
import FeedComponent from '../components/FeedComponent';

const FeedScreen = () => {
    const [actionFlug, setActionFlug] = useState(false);
    /** ftp登録時の動作 */
    const action = (flug: boolean) => {
        if (flug) {
            setActionFlug(!actionFlug);
        }
    }
    return (
        <View style={styles.container}>
            <FeedComponent actionFlug={actionFlug}></FeedComponent>
            <EntryDialog action={action}></EntryDialog>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default FeedScreen;
