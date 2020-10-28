import React from 'react';
import { List, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../configs/Colors';

import SimpleDialog from './SimpleDialog';

/** モックデータ */
const data: ItemProps[] = [
    {
        no: 1,
        type: 'ftp',
        date: new Date('2020-09-01'),
        ftp: 180,
        weight: 65.0,
        condition: '普通',
    }, {
        no: 2,
        type: 'topic',
        date: new Date('2020-09-01'),
        message: '初めて記録した記念すべき日です。',
    }, {
        no: 3,
        type: 'ftp',
        date: new Date('2020-09-05'),
        ftp: 185,
        weight: 64.8,
        condition: '悪い',
    }, {
        no: 4,
        type: 'ftp',
        date: new Date('2020-09-07'),
        ftp: 180,
        weight: 64.1,
        condition: '良好',
    }, {
        no: 5,
        type: 'topic',
        date: new Date('2020-09-07'),
        message: '3回目の記録です。この調子で継続しましょう。',
    }, {
        no: 6,
        type: 'ftp',
        date: new Date('2020-09-25'),
        ftp: 200,
        weight: 64.0,
        condition: '良好',
    }, {
        no: 7,
        type: 'ftp',
        date: new Date('2020-10-02'),
        ftp: 190,
        weight: 63.0,
        condition: '悪い',
    }, {
        no: 8,
        type: 'topic',
        date: new Date('2020-10-02'),
        message: '5回目の記録です。継続は力なり。',
    }, {
        no: 9,
        type: 'ftp',
        date: new Date('2020-10-03'),
        ftp: 210,
        weight: 63.5,
        condition: '良好',
    }, {
        no: 10,
        type: 'ftp',
        date: new Date('2020-10-10'),
        ftp: 222,
        weight: 63.5,
        condition: '普通',
    }, {
        no: 11,
        type: 'ftp',
        date: new Date('2020-10-15'),
        ftp: 203,
        weight: 63.5,
        condition: '良好',
    }, {
        no: 12,
        type: 'ftp',
        date: new Date('2020-10-10'),
        ftp: 205,
        weight: 64.5,
        condition: '悪い',
    }, {
        no: 13,
        type: 'ftp',
        date: new Date('2020-10-30'),
        ftp: 225,
        weight: 60.0,
        condition: '良好',
    }, {
        no: 14,
        type: 'topic',
        date: new Date('2020-10-30'),
        message: '10回目の記録です。素晴らしい！',
    }
];

type ItemProps = {
    no: number,
    type: 'ftp' | 'topic',
    date: Date,
    ftp?: number,
    weight?: number,
    condition?: '良好' | '普通' | '悪い',
    message?: string,
}

type RenderItemProps = {
    item: ItemProps,
}

/** フィードコンポーネント */
const FeedComponent = () => {
    const [dialogVisible, setDialogVisible] = React.useState<boolean>();
    const toggleDialog = () => setDialogVisible(!dialogVisible);
    const getDialogVisible = () => !!dialogVisible;

    const [deleteNo, setDeleteNo] = React.useState<number>();
    const deleteIconPress = (no: number) => {
        toggleDialog();
        setDeleteNo(no);
    }

    const deleteAction = (flug: boolean) => {
        toggleDialog();
        console.log(flug + ': ' + deleteNo);
    }

    const renderItem = ({ item }: RenderItemProps) => (
        <Layout style={styles.listStyle} >
            <Layout style={styles.iconItemContainer}>
                <ListIcon
                    no={item.no}
                    type={item.type}
                    date={item.date}
                    condition={item.condition}
                ></ListIcon>
                <Layout style={styles.itemContainer}>
                    <Text category='s1'>
                        {item.date.getFullYear().toString() + '/' + (item.date.getMonth() + 1).toString() + '/' + item.date.getDate().toString()}
                    </Text>
                    <MainItem
                        no={item.no}
                        type={item.type}
                        date={item.date}
                        ftp={item.ftp}
                        weight={item.weight}
                        message={item.message}
                    ></MainItem>
                </Layout>
            </Layout>
            <DeleteItemIcon
                type={item.type}
                no={item.no}
                buttonClickAction={deleteIconPress}
            ></DeleteItemIcon>
        </Layout>
    );

    return (
        <Layout>
            <List
                data={data}
                renderItem={renderItem}
            />
            <SimpleDialog
                title={deleteNo + 'を削除しますか？'}
                okButtonName='削除'
                visible={getDialogVisible()}
                action={deleteAction}
            />
        </Layout>
    );
};

/** リストアイコン */
const ListIcon = ({ type, condition }: ItemProps) => {
    if (type === 'ftp') {
        if (condition === '良好') {
            return (
                <ListAntDesignIcon name='smileo' color={Colors.tint}></ListAntDesignIcon>
            );
        } else if (condition === '普通') {
            return (
                <ListAntDesignIcon name='meh' color={Colors.iconMeh}></ListAntDesignIcon>
            );
        } else if (condition === '悪い') {
            return (
                <ListAntDesignIcon name='frowno' color={Colors.iconFrown}></ListAntDesignIcon>
            );
        }
    } else {
        return (
            <ListAntDesignIcon name='star' color={Colors.iconTopic}></ListAntDesignIcon>
        );
    }
    return <></>
}

type ListAntDesignIconProps = {
    name: string,
    color: string,
}
/** AntDesignアイコン */
const ListAntDesignIcon = ({ name, color }: ListAntDesignIconProps) => {
    return (
        <AntDesign
            name={name}
            size={32}
            color={color}
        ></AntDesign>
    );
}

/** データ表示部 */
const MainItem = ({ type, ftp = 0, weight = 0, message }: ItemProps) => {
    if (type === 'ftp') {
        return (
            <Layout style={[styles.flexContainer]}>
                <DispData name='FTP' data={ftp.toString()} unit='W'></DispData>
                <DispData name='体重' data={weight.toString()} unit='kg'></DispData>
                <DispData name='PWR' data={(ftp / weight).toFixed(1).toString()} unit='W/kg'></DispData>
            </Layout>
        );
    } else {
        return (
            <Layout style={{ flexDirection: 'row' }}>
                <Text style={{ width: 0, flexGrow: 1 }}>{message}</Text>
            </Layout>
        );
    }
}

type DispDataProps = {
    name: string,
    data: string,
    unit: string,
}
/** データ */
const DispData = ({ name, data, unit }: DispDataProps) => {
    return (
        <Layout>
            <Text style={styles.textDataName} category='c2'>{name}</Text>
            <Text>{data} {unit}</Text>
        </Layout>
    );
}

type DeleteIconProps = {
    type: 'ftp' | 'topic',
    no: number,
    buttonClickAction: (no: number) => void;
}
const DeleteItemIcon: React.FC<DeleteIconProps> = ({ type, no, buttonClickAction }: DeleteIconProps) => {
    if (type === 'ftp') {
        return (
            <AntDesign
                name='delete'
                size={32}
                onPress={() => buttonClickAction(no)}
                color='gray'
            ></AntDesign>);
    } else {
        return <></>
    }

}

const styles = StyleSheet.create({
    listStyle: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
    },
    itemContainer: {
        marginLeft: 8,
        marginRight: 8,
        flexGrow: 0.8,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexGrow: {
        flexGrow: 1
    },
    listIcon: {
        width: 32,
        height: 32,
    },
    textDataName: {
        textAlign: 'center',
    }

});

export default FeedComponent
