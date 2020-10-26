import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EntryDialog from '../components/EntryDialog';

export default class FeedScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Feed</Text>
                <EntryDialog></EntryDialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
