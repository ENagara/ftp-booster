import React, { Component } from "react";
import * as Sentry from '@sentry/browser';
import { StyleSheet, View, Text } from 'react-native';
import { auth } from '../configs/Firebase';

interface Props { }

interface State {
    error: any
    errorInfo: any
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Sentryにエラー情報を出力
        Sentry.withScope(scope => {
            scope.setExtras(errorInfo);
            const user = auth.currentUser;
            scope.setUser({
                username: user?.displayName || 'name undefined',
                email: user?.email || 'email undefined',
            });
            Sentry.captureException(error);
        });
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <View style={styles.center}>
                    <Text>予期しない例外が発生しました。{"\n"}申し訳ありません。</Text>
                    <Text>{"\n"}</Text>
                    <Text>もう一度操作をしても、状況が変わらない場合はお問い合わせください。</Text>
                    <Text>{"\n\n"}</Text>
                    <Text>{this.state.error && this.state.error.toString()}</Text>
                </View>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
    },
});
