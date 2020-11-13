import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import SimpleDialog from './SimpleDialog';

type Props = {
    buttonName: string;
    dialogTitle: string;
    dialogOkButtonName: string;
    action: (flug: boolean) => void;
};

const ButtonDialog: React.FC<Props> = ({ buttonName, dialogTitle, dialogOkButtonName, action}: Props) => {
    const [visible, setVisible] = React.useState<boolean>();

    const toggleDialog = () => setVisible(!visible);

    const getVisible = () => !!visible;

    const setAction = (flug: boolean) => {
        toggleDialog();
        action(flug);
    }

    return (
        <View style={[styles.container]}>
            <Button
                onPress={toggleDialog}
                style={styles.button}
            >
                {buttonName}
            </Button>
            <SimpleDialog
                title={dialogTitle}
                okButtonName={dialogOkButtonName}
                visible={getVisible()}
                action={setAction}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    button: {
        margin: 4,
    },
});

export default ButtonDialog;
