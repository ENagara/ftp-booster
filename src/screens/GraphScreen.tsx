import React from 'react';
import { StyleSheet } from 'react-native';
import { Tab, TabView } from '@ui-kitten/components';
import LineChart from '../components/LineChart';

const GraphScreen = () => {

    const [selectedPeriodIndex, setSelectedPeriodIndex] = React.useState(1);
    const [selectedDataOptinoIndex, setSelectedDataOptinoIndex] = React.useState(0);
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
            <LineChart 
                selectedPeriodIndex={selectedPeriodIndex}
                selectedDataOptinoIndex={selectedDataOptinoIndex}>
            </LineChart>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab : {
        height:50
    }
});

export default GraphScreen;