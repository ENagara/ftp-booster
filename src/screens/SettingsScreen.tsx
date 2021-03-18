import React, { useState } from 'react';
import { View } from 'react-native';
import ButtonDialog from '../components/ButtonDialog';
import { auth } from '../configs/Firebase';
import { Button } from '@ui-kitten/components';
type Props = {
    navigation: any;
}
const SettingsScreen = ({ navigation }: Props) => {
    const [, setError] = useState();

    const action = (flug: boolean) => {
        // ログアウト処理
        if (flug) {
            auth.signOut()
                .catch(error => {
                    setError(error);
                });
        }
    }
    return (
        <View>
            <Button status='control' onPress={() => navigation.navigate('WhatFTP')}>パワトレ用語について
            </Button>
            <ButtonDialog
                buttonName='ログアウト'
                dialogTitle='ログアウトしますか？'
                dialogOkButtonName='ログアウト'
                action={action}>
            </ButtonDialog>
        </View>
    )
}

export default SettingsScreen;
