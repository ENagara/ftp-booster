import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Tab, TabView } from '@ui-kitten/components';
import LineChart from '../components/LineChart';
import { useFocusEffect } from '@react-navigation/native';

/** configs */
import { FtpDataParam, DataTypeParam, PointDataParam } from '../configs/Types';
/** actions */
import { GetFtpDataList } from '../actions/FtpDataAction';


const GraphScreen = () => {

    const [selectedPeriodIndex, setSelectedPeriodIndex] = useState<number>(1);
    const [selectedDataOptinoIndex, setSelectedDataOptinoIndex] = useState<number>(0);
    const [dispData, setDispdata] = useState<PointDataParam[]>([]);
    const [orgFtpData, setOrgFtpData] = useState<FtpDataParam[]>([]);

    let wkOrgFtpData: FtpDataParam[] = [];
    /** スクリーンフォーカス時 */
    useFocusEffect(
        useCallback(() => {
            setSelectedPeriodIndex(1);
            setSelectedDataOptinoIndex(0);
            // データ取得
            GetFtpDataList().then(data => {
                wkOrgFtpData = data.filter(item => {
                    return item.type === DataTypeParam.FTP
                });
                setOrgFtpData(wkOrgFtpData);

                // 6か月前
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
            switch (selectedDataOptinoIndex) {
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
        switch (selectedPeriodIndex) {
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
    }, [selectedPeriodIndex, selectedDataOptinoIndex]);


    return (
        <>
            <TabView
                selectedIndex={selectedPeriodIndex}
                onSelect={setSelectedPeriodIndex}>
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
                selectedIndex={selectedDataOptinoIndex}
                onSelect={setSelectedDataOptinoIndex}>
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
            <LineChart dispData={dispData}></LineChart>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab: {
        height: 50
    }
});

export default GraphScreen;
