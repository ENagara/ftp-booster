import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Dialog, FAB } from 'react-native-paper';
import { Button, Tab, TabView, Text, Input, Select, SelectOption } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';

import PlatformDatepicker from './PlatformDatepicker';

/** コンディションのオプション */
const conditionOption = [
    { text: '良好' },
    { text: '普通' },
    { text: '悪い' },
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
                <Dialog onDismiss={()=>setVisible(false)} visible={getVisible()}>
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
    const [condition, setCondition] = useState<SelectOption>();

    const buttonAction = (flug: boolean = false) => {
        console.log('登録 : ' + flug);
        action(false);
    }
    const selectCondition = (select: SelectOption) => {
        setCondition(select);
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
                            <Input
                                placeholder='FTPを入力[W]'
                                value={ftp}
                                onChangeText={setFtp}
                                keyboardType='numeric'
                                maxLength={4}
                            />
                        </Tab>
                        <Tab title='20分測定'>
                            <Input
                                placeholder='20分の平均パワーを入力[W]'
                                value={ftp20power}
                                onChangeText={setFtp20power}
                                keyboardType='numeric'
                                maxLength={4}
                            />
                        </Tab>
                    </TabView>
                </View>

                <View style={styles.contents}>
                    <Text>体重</Text>
                    <Input
                        placeholder='体重を入力[kg] ex)60.0'
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType='numeric'
                        maxLength={5}
                    />
                </View>

                <View style={styles.contents}>
                    <Text>コンディション</Text>
                    <Select
                        placeholder='コンディションを選択'
                        data={conditionOption}
                        selectedOption={condition}
                        onSelect={selectCondition}
                    />
                </View>

            </View>
            <Dialog.Actions>
                <Button
                    onPress={() => buttonAction()}
                    appearance='outline'
                >
                    キャンセル
                            </Button>
                <Button
                    onPress={() => buttonAction(true)}
                    appearance='filled'
                    style={styles.leftMargin}
                >
                    登録
                        </Button>
            </Dialog.Actions>
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
        marginLeft: 16
    }
});

export default EntryDialog;
