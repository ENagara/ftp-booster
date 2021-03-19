import React from 'react';
import { Button, Portal, Dialog } from 'react-native-paper';

type Props = {
    title: string;
    okButtonName: string;
    visible: boolean;
    action: (flug: boolean) => void;
};

const SimpleDialog = ({ title, okButtonName, visible, action }: Props) => {
    const buttonAction = (flug: boolean = false) => {
        action(flug);
        visible = false;
    }

    return (
        <Portal>
            <Dialog onDismiss={() => buttonAction()} visible={visible}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Actions>
                    <Button onPress={() => buttonAction()}>キャンセル</Button>
                    <Button onPress={() => buttonAction(true)}>{okButtonName}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default SimpleDialog;
