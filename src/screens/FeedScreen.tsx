import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import EntryDialog from '../components/EntryDialog';
import FeedComponent from '../components/FeedComponent';

export default class FeedScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FeedComponent></FeedComponent>
                <EntryDialog></EntryDialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
