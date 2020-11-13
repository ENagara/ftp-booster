import React from 'react';
import ButtonDialog from '../components/ButtonDialog';
import { auth } from '../configs/Firebase';

const SettingsScreen = () => {
    const action = (flug: boolean) => {
        // ログアウト処理
        if (flug) {
            auth.signOut()
                .then(() => {
                    console.log('ログアウトしました');
                })
                .catch(({ message }) => {
                    console.log(message);
                });
        }
    }

    return (
        <ButtonDialog
            buttonName='ログアウト'
            dialogTitle='ログアウトしますか？'
            dialogOkButtonName='ログアウト'
            action={action}
        >
        </ButtonDialog>
    )
}
export default SettingsScreen;
