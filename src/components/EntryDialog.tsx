import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Portal, Dialog, FAB, Text, Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

/** actions */
import { entryFtp } from '../actions/FtpDataAction';

/** components */
import WaitDialog from './WaitDialog';
import Datepicker from './Datepicker';
import Ftppicker from './Ftppicker';
import Weightpicker from './Weightpicker';

/** configs */
import { FtpDataParam, DataTypeParam, ConditionParam } from '../configs/Types';
import Colors from '../configs/Colors';

/** コンディションのオプション */
type ConditionOption = {
    text: ConditionParam,
    mode: 'contained' | 'outlined' | 'text',
}
const initConditionOption: ConditionOption[] = [
    { text: ConditionParam.GOOD, mode: 'contained' },
    { text: ConditionParam.NORMAL, mode: 'outlined' },
    { text: ConditionParam.BAD, mode: 'outlined' },
];

type EntryDialogProps = {
    action: (flug: boolean) => void;
}
const EntryDialog = ({ action }: EntryDialogProps) => {
    const [visible, setVisible] = useState<boolean>();
    const getVisible = () => !!visible;
    const entryAction = (flug: boolean) => {
        setVisible(false);
        action(flug);
    }

    return (
        <>
            <FAB
                style={styles.fab}
                icon={({ size, color }) => (
                    <AntDesign name={'plus'} color={color} size={size} />
                )}
                onPress={() => setVisible(true)}
            />
            <Portal>
                <Dialog
                    style={styles.dialog}
                    onDismiss={() => setVisible(false)}
                    visible={getVisible()}
                    dismissable={false}>
                    <EntryContainer action={entryAction}></EntryContainer>

                </Dialog>
            </Portal>
        </>
    );
};

type EntryContainerProp = {
    action: (flug: boolean) => void;
}
const EntryContainer = ({ action }: EntryContainerProp) => {
    const [date, setDate] = useState(new Date());
    const [ftp, setFtp] = useState(0);
    const [weight, setWeight] = useState(0);
    const [condition, setCondition] = useState<ConditionParam>(ConditionParam.GOOD);
    const [conditionOption,] = useState<ConditionOption[]>(initConditionOption);

    const [waitVisible, setWeitVisible] = useState(false);
    const [, setError] = useState();

    /** 登録ボタン押下 */
    const entryAction = async () => {
        // スピナー開始
        setWeitVisible(true);

        const ftpData: FtpDataParam = {
            docId: '', // 後工程で附番
            no: 0, // ダミーの番号（後に採番）
            date: date,
            type: DataTypeParam.FTP,
            ftp: ftp,
            weight: weight,
            condition: condition
        }

        // 入力データをfirestoreに登録
        entryFtp(ftpData).then(() => {
            setWeitVisible(false);
            action(true);
        }).catch(error => {
            setError(error);
        });
    }

    /** キャンセルボタン押下 */
    const cancelAction = () => {
        action(false);
    }

    const setConditionValue = (selectNumber: number) => {
        setCondition(conditionOption[selectNumber].text);
        // ボタンの表示を切り替え
        conditionOption.forEach((element, index) => {
            element.mode = selectNumber === index ? 'contained' : 'outlined';
        });
    }

    /** コンディションボタングループ */
    const ConditionButtonGroup = () => {
        return (
            <View style={styles.buttonGroup}>
                {
                    conditionOption.map((data, index) => {
                        return (
                            <Button
                                key={data.text}
                                onPress={() => setConditionValue(index)}
                                mode={data.mode}
                                style={styles.buttonFlex}>{data.text}</Button>
                        );
                    })
                }
            </View>
        );
    }

    return (
        <View>
            <Dialog.Title style={styles.dialogTitle}>計測値を登録</Dialog.Title>
            <Divider style={styles.divider}></Divider>
            <View style={styles.container}>
                <View style={styles.contents}>
                    <Text>計測日</Text>
                    <View style={styles.picker}>
                        <Datepicker selectDate={setDate}></Datepicker>
                    </View>
                </View>

                <View style={styles.contents}>
                    <Text>FTP</Text>
                    <View style={styles.picker}>
                        <Ftppicker selectFtp={setFtp}></Ftppicker>
                    </View>
                </View>

                <View style={styles.contents}>
                    <Text>体重</Text>
                    <View style={styles.picker}>
                        <Weightpicker selectWeight={setWeight}></Weightpicker>
                    </View>
                </View>

                <View style={styles.contents}>
                    <Text>コンディション</Text>
                    <ConditionButtonGroup></ConditionButtonGroup>
                </View>

            </View>
            <Dialog.Actions>
                <Button
                    onPress={() => cancelAction()}
                    mode='text'
                    style={styles.buttonTextPadding}>
                    キャンセル
                </Button>
                <Button
                    onPress={() => entryAction()}
                    mode='contained'
                    style={[styles.leftMargin, styles.buttonTextPadding]}>
                    登録
                </Button>
            </Dialog.Actions>
            <WaitDialog visible={waitVisible}></WaitDialog>
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    dialog: {
        marginHorizontal: 4
    },
    dialogTitle: {
        marginVertical: 8
    },
    container: {
        marginHorizontal: 16,
        marginVertical: 4
    },
    contents: {
        marginBottom: 4
    },
    leftMargin: {
        marginLeft: 32
    },
    buttonTextPadding: {
        paddingHorizontal: 16
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    buttonFlex: {
        flexGrow: 1
    },
    divider: {
        backgroundColor: Colors.tint
    },
    picker: {
        overflow: 'hidden',
        height: 100,
        display: 'flex',
        justifyContent: 'center'
    }
});

export default EntryDialog;
