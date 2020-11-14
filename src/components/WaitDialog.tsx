import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Portal, Dialog } from 'react-native-paper';
import { Spinner } from '@ui-kitten/components';

type WaitDialogProps = {
    visible: boolean;
}
/** リクエスト処理中のダイアログ */
const WaitDialog = ({ visible }: WaitDialogProps) => {
    return (
        <Portal>
            <Dialog visible={visible} dismissable={false}>
                <Dialog.Content style={styles.container}>
                    <Spinner size='giant' />
                    <Text>　少しお待ちください</Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
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

export default WaitDialog;
