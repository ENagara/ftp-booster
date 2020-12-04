import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Tab, TabView } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

/** actions */
import { getFtpDataList } from '../actions/FtpDataAction';

/** components */
import LineChart from '../components/LineChart';
import WaitSpinner from '../components/WaitSpinner';

/** configs */
import { FtpDataParam, DataTypeParam, PointDataParam, GraphState } from '../configs/Types';


const GraphScreen = () => {
    const [graphState, setGraphState] = React.useState<GraphState>(GraphState.Loading);
    const [periodIndex, setPeriodIndex] = useState<number>(1);
    const [dataOptinoIndex, setDataOptinoIndex] = useState<number>(0);
    const [dispData, setDispdata] = useState<PointDataParam[]>([]);
    const [orgFtpData, setOrgFtpData] = useState<FtpDataParam[]>([]);

    /** 画面フォーカス判定 */
    const isFocused = useIsFocused();

    /** 期間タブ選択 */
    const setSelectPeriod = (index: number) => {
        // GraphScreenを表示中の場合実行
        if (isFocused) {
            setPeriodIndex(index);
        }
    }

    /** データ種類タブ選択 */
    const setSelectedDataOptino = (index: number) => {
        // GraphScreenを表示中の場合実行
        if (isFocused) {
            setDataOptinoIndex(index);
        }
    }

    /**
     * 画面フォーカス時
     * フィード画面など他のタブからグラフ画面に遷移した場合に発火
     */
    useFocusEffect(
        useCallback(() => {
            // データ取得
            getFtpDataList().then(data => {
                let wkOrgFtpData = data.filter(item => {
                    return item.type === DataTypeParam.FTP
                });
                setOrgFtpData(wkOrgFtpData);
                if (wkOrgFtpData.length === 0) {
                    // データが登録されていない場合
                    setGraphState(GraphState.DataNotExists);
                    return;
                }
                setGraphState(GraphState.DataExists);
                // 期間：6か月間を選択
                setPeriodIndex(1);
                // データ種類：FTPを選択
                setDataOptinoIndex(0);
                // 6か月前までのデータに絞る
                const sixMonthAgo = new Date();
                sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
                setDispdata(wkOrgFtpData.filter(item => {
                    return sixMonthAgo < item.date;
                }).map(item => {
                    const pointData: PointDataParam = {
                        x: item.date,
                        y: Number(item.ftp),
                        ftp: Number(item.ftp),
                        weight: Number(item.weight),
                        condition: item.condition,
                        pwr: Number(item.ftp) / Number(item.weight),
                    }
                    return pointData;
                }));
            });
        }, [])
    );

    /** グラフの再表示 */
    useEffect(() => {
        const chouseY = (ftp: number, weight: number) => {
            switch (dataOptinoIndex) {
                case 0: // ftp
                    return ftp;
                case 1: // PWR
                    return Math.round(ftp / weight * 10) / 10;
                default: // weight
                    return weight;
            }
        }

        // 期間
        const peropd = new Date();
        switch (periodIndex) {
            case 0: // 3か月
                peropd.setMonth(peropd.getMonth() - 3);
                break;
            case 1: // 6か月
                peropd.setMonth(peropd.getMonth() - 6);
                break;
            case 2: // 1年間
                peropd.setMonth(peropd.getMonth() - 12);
                break;
            case 3: // 2年間
                peropd.setMonth(peropd.getMonth() - 24);
                break;
            default: // 全期間
                peropd.setFullYear(1900);
        }
        setDispdata(orgFtpData.filter(item => {
            return peropd < item.date;
        }).map(item => {
            const pointData: PointDataParam = {
                x: item.date,
                y: chouseY(Number(item.ftp), Number(item.weight)),
                ftp: Number(item.ftp),
                weight: Number(item.weight),
                condition: item.condition,
                pwr: Math.round(Number(item.ftp) / Number(item.weight) * 10) / 10,
            }
            return pointData;
        }));
    }, [periodIndex, dataOptinoIndex]);

    // ロード状態によって表示を変更
    switch (graphState) {
        case GraphState.Loading:
            // 読み込み中の場合
            return (
                <WaitSpinner></WaitSpinner>
            );
        case GraphState.DataNotExists:
            // データが存在しない場合
            return (
                <Text>データが登録されていません。</Text>
            );
        default:
            // データが存在する場合
            return (
                <>
                    <TabView
                        selectedIndex={periodIndex}
                        onSelect={setSelectPeriod}>
                        <Tab title='3か月間' style={styles.tab}>
                            <></>
                        </Tab>
                        <Tab title='6か月間' style={styles.tab}>
                            <></>
                        </Tab>
                        <Tab title='1年間' style={styles.tab}>
                            <></>
                        </Tab>
                        <Tab title='2年間' style={styles.tab}>
                            <></>
                        </Tab>
                        <Tab title='全期間' style={styles.tab}>
                            <></>
                        </Tab>
                    </TabView>

                    <TabView
                        selectedIndex={dataOptinoIndex}
                        onSelect={setSelectedDataOptino}>
                        <Tab title='FTP' style={styles.tab}>
                            <></>
                        </Tab>
                        <Tab title='PWR' style={styles.tab}>
                            <></>
                        </Tab>
                        <Tab title='体重' style={styles.tab}>
                            <></>
                        </Tab>
                    </TabView>
                    {
                        dispData.length === 0
                            ? <Text>この期間にデータが登録されていません。</Text>
                            : <View style={styles.lineChart}>
                                <LineChart dispData={dispData}></LineChart>
                            </View>
                    }
                </>
            )
    }
}

const styles = StyleSheet.create({
    lineChart: {
        margin: 16
    },
    tab: {
        height: 50
    }
});

export default GraphScreen;
