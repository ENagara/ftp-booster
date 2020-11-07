import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LineChart from '../components/LineChart';

export default class GraphScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LineChart></LineChart>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
