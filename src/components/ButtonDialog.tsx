import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Button } from 'react-native-paper';
import SimpleDialog from './SimpleDialog';

type Props = {
    buttonName: string;
    dialogTitle: string;
    dialogOkButtonName: string;
};

const ButtonDialog: React.FC<Props> = ({ buttonName, dialogTitle, dialogOkButtonName }: Props) => {
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
                {buttonName}
            </Button>
            <SimpleDialog
                title={dialogTitle}
                okButtonName={dialogOkButtonName}
                visible={_getVisible()}
                action={setAction}
            />
        </View>
    );
};

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

export default ButtonDialog;
