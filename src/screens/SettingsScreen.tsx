import React, { Component } from 'react';
import { View } from 'react-native';
import ButtonDialog from '../components/ButtonDialog';

export default class SettingsScreen extends Component {
    render() {
        return (
            <ButtonDialog
                buttonName='ログアウト'
                dialogTitle='ログアウトしますか？'
                dialogOkButtonName='ログアウト'>
            </ButtonDialog>

        )
    }
}
