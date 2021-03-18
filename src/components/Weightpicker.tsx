import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import MultiPicker from 'rmc-picker/lib/MultiPicker';
import Picker from 'rmc-picker/lib/Picker';

/** actions */
import { getPastWeight } from '../actions/FtpDataAction';

type Props = {
    selectWeight: (weight: number) => void;
}

/**
 * Weightpicker
 * 20.0～120.9kgまでの選択
 */
const Weightpicker = ({ selectWeight }: Props) => {
    const [, setError] = useState();
    const [selectedWeight, setSelectedWeight] = useState([0, 0, 0, 0]);
    // 選択できる体重-整数値(30～150)
    const integerList = [...Array(101)].map((v, i) => i + 20);
    // 選択できる体重-少数値(0~9)
    const decimalList = [...Array(10)].map((v, i) => i);

    /** 初期設定 */
    useEffect(() => {
        let pastWeight = 0;
        // 直近の体重を初期表示
        getPastWeight().then(weight => {
            // 体重設定が無い場合
            if (weight < 20 || 120.9 < weight) {
                // 初期値は60kgとする
                pastWeight = 60.0;
            } else {
                pastWeight = weight;
            }
            const weightArr = String(pastWeight).split('.');
            const decimalStr = weightArr[1] ? weightArr[1] : 0;
            // 初期体重設定
            setSelectedWeight([Number(weightArr[0]), 0, Number(decimalStr), 0]);
            selectWeight(pastWeight);
        }).catch(error => {
            setError(error);
        });
    }, []);

    const onChange = (changeValue: [number, number, number, number]) => {
        setSelectedWeight(changeValue);
        selectWeight(changeValue[0] + changeValue[2] * 0.1);
    }
    return (
        <MultiPicker
            selectedValue={selectedWeight}
            onValueChange={onChange}>
            <Picker>
                {integerList.map(integer => { return (<Picker.Item value={integer} key={integer} >{integer}</Picker.Item>) })}
            </Picker>
            <Text>.</Text>
            <Picker>
                {decimalList.map(decimal => { return (<Picker.Item value={decimal} key={decimal} >{decimal}</Picker.Item>) })}
            </Picker>
            <Text>kg</Text>
        </MultiPicker>
    );
}

export default Weightpicker;
