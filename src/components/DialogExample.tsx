import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Button } from 'react-native-paper';
import SimpleDialog from './SimpleDialog';

const DialogExample = () => {
    const [visible, setVisible] = React.useState<boolean>();

    const _toggleDialog = () => setVisible(!visible);

    const _getVisible = () => !!visible;

    const setAction = (flug: boolean) => {
        _toggleDialog();
        console.log(flug);
    }

    return (
        <View style={[styles.container]}>
            <Button
                mode='outlined'
                onPress={() => _toggleDialog()}
                style={styles.button}
            >
                ログアウト
            </Button>
            <SimpleDialog
                title={'ログアウトしますか？'}
                okButtonName={'ログアウト'}
                visible={_getVisible()}
                action={setAction}
            />
        </View>
    );
};

DialogExample.title = 'Dialog';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.grey200,
        padding: 12,
    },
    button: {
        margin: 4,
    },
});

export default DialogExample;
