import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import MultiPicker from 'rmc-picker/lib/MultiPicker';
import Picker from 'rmc-picker/lib/Picker';

type Props = {
    selectDate: (date: Date) => void;
}

/**
 * Datepicker
 * 2010年1月1日～本日までの日付選択フォーム
 */
const Datepicker = ({ selectDate }: Props) => {
    // 本日年月日
    const nowDate = new Date();
    const [selectedDate, setSelectedDate] = useState([0, 0, 0, 0, 0]);
    // 選択できる月(1~12)
    const [monthList, setMonthList] = useState([...Array(nowDate.getMonth() + 1)].map((v, i) => i + 1));
    // 選択できる日(1~31) ※月によって異なる
    const [dayList, setDayList] = useState([...Array(nowDate.getDate())].map((v, i) => i + 1));

    // 開始年
    const startYear = 2010;
    // 選択できる年数
    const yearPeriod = nowDate.getFullYear() - startYear + 1;
    // 選択できる年
    const yearList = [...Array(yearPeriod)].map((v, i) => i + startYear);

    /** 初期設定 */
    useEffect(() => {
        // 初期日付設定
        setSelectedDate([nowDate.getFullYear(), 0, (nowDate.getMonth() + 1), 0, nowDate.getDate()]);
    }, []);

    const onChange = (changeValue: [number, number, number, number, number]) => {
        // 現在の年を選択している場合
        if (nowDate.getFullYear() === changeValue[0]) {
            // 選択可能な月を編集
            setMonthList([...Array(nowDate.getMonth() + 1)].map((v, i) => i + 1));

            // 未来の月を選択している場合
            if (nowDate.getMonth() + 1 < changeValue[2]) {
                changeValue[2] = nowDate.getMonth() + 1;
            }
            // 現在の月の場合（現在の月に強制変更された場合も含む）
            if (nowDate.getMonth() + 1 === changeValue[2]) {
                // 今日の日付まで表示
                setDayList([...Array(nowDate.getDate())].map((v, i) => i + 1));

                // 日付が未来の場合
                if (nowDate.getDate() < changeValue[4]) {
                    changeValue[4] = nowDate.getDate();
                }
            } else {
                // 選択年月の最終日までを編集
                const lastDay = new Date(changeValue[0], changeValue[2], 0).getDate();
                setDayList([...Array(lastDay)].map((v, i) => i + 1));
            }

        } else {
            // 選択可能な月を編集
            setMonthList([...Array(12)].map((v, i) => i + 1));
            // 選択年月の最終日までを編集
            const lastDay = new Date(changeValue[0], changeValue[2], 0).getDate();
            setDayList([...Array(lastDay)].map((v, i) => i + 1));
        }
        setSelectedDate(changeValue);
        selectDate(new Date(changeValue[0], changeValue[2] - 1, changeValue[4]))
    }
    return (
        <View style={styles.datepicker}>
            <MultiPicker
                selectedValue={selectedDate}
                onValueChange={onChange}>
                <Picker>
                    {yearList.map(year => { return (<Picker.Item value={year} key={year} >{year}</Picker.Item>) })}
                </Picker>
                <Text>年</Text>
                <Picker>
                    {monthList.map(month => { return (<Picker.Item value={month} key={month} >{month}</Picker.Item>) })}
                </Picker>
                <Text>月</Text>
                <Picker>
                    {dayList.map(day => { return (<Picker.Item value={day} key={day} >{day}</Picker.Item>) })}
                </Picker>
                <Text>日</Text>
            </MultiPicker>
        </View>
    );
}

const styles = StyleSheet.create({
    datepicker: {
        overflow: 'hidden',
        height: 100,
        display: 'flex',
        justifyContent: 'center'
    }
});

export default Datepicker;
