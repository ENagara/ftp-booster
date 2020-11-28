import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText, Portal, Dialog, FAB, Text } from 'react-native-paper';
import { Tab, TabView } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';
import PlatformDatepicker from './PlatformDatepicker';

/** components */
import WaitDialog from './WaitDialog';

/** types */
import { FtpDataParam, DataTypeParam, ConditionParam } from '../configs/Types';

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

const EntryDialog = () => {
    const [visible, setVisible] = useState<boolean>();
    const getVisible = () => !!visible;

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
                    onDismiss={() => setVisible(false)}
                    visible={getVisible()}
                    dismissable={false}>
                    <EntryContainer action={setVisible}></EntryContainer>
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
    const [selectInputKind, setSelectInputKind] = useState(0);
    const [ftp, setFtp] = useState('');
    const [ftp20power, setFtp20power] = useState('');
    const [weight, setWeight] = useState('');
    const [condition, setCondition] = useState<ConditionParam>(ConditionParam.GOOD);
    const [conditionOption,] = useState<ConditionOption[]>(initConditionOption);

    const [waitVisible, setWeitVisible] = React.useState(false);
    const [operationDirty, setOperationDirty] = React.useState(false);
    const [, setError] = React.useState();

    /** 登録ボタン押下 */
    const entryAction = async () => {
        setOperationDirty(true);
        // 入力エラーがある場合処理しない
        if ((selectInputKind === 0 && isIntegerError(ftp)) || (selectInputKind === 1 && isIntegerError(ftp20power))
            || isWeightError()) {
            return;
        }
        // スピナー開始
        setWeitVisible(true);

        const ftpData: FtpDataParam = {
            no: 0, // ダミーの番号（後に採番）
            date: date,
            type: DataTypeParam.FTP,
            ftp: Number.parseInt(ftp),
            weight: Number.parseFloat(weight),
            condition: condition
        }
        
        // 入力データをfirestoreに登録
        console.log('firestoreに登録');
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

    /** 整数チェック */
    const integerRegexp = new RegExp(/^[1-9]\d*$/);
    const isIntegerError = (number: string) => {
        return !integerRegexp.test(number);
    };

    /** 体重チェック */
    const weightRegexp = new RegExp(/^[1-9]\d*(|\.\d)$/);
    const isWeightError = () => {
        return !weightRegexp.test(weight);
    };

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
        <>
            <Dialog.Title>計測値を登録</Dialog.Title>
            <View style={styles.container}>
                <View style={styles.contents}>
                    <Text>計測日</Text>
                    <PlatformDatepicker selectDate={setDate}></PlatformDatepicker>
                </View>

                <View style={styles.contents}>
                    <Text>FTP</Text>
                    <TabView
                        selectedIndex={selectInputKind}
                        onSelect={setSelectInputKind}>
                        <Tab title='直接入力'>
                            <>
                                <TextInput
                                    placeholder='FTPを入力[W]'
                                    value={ftp}
                                    onChangeText={setFtp}
                                    keyboardType='numeric'
                                    maxLength={4}
                                />
                                <HelperText type="error" visible={isIntegerError(ftp) && operationDirty}>
                                    半角で整数を入力してください。ex) 220
                                </HelperText>
                            </>
                        </Tab>
                        <Tab title='20分測定'>
                            <>
                                <TextInput
                                    placeholder='20分の平均パワーを入力[W]'
                                    value={ftp20power}
                                    onChangeText={setFtp20power}
                                    keyboardType='numeric'
                                    maxLength={4}
                                />
                                <HelperText type="error" visible={isIntegerError(ftp20power) && operationDirty}>
                                    半角で整数を入力してください。ex) 230
                                </HelperText>
                            </>
                        </Tab>
                    </TabView>
                </View>

                <View style={styles.contents}>
                    <Text>体重</Text>
                    <TextInput
                        placeholder='体重を入力[kg]'
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType='numeric'
                        maxLength={5}
                    />
                    <HelperText type="error" visible={isWeightError() && operationDirty}>
                        半角数字で入力してください。ex) 62.3
                    </HelperText>
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
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    container: {
        margin: 16
    },
    contents: {
        marginTop: 16,
        marginBottom: 16
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
    }
});

export default EntryDialog;
