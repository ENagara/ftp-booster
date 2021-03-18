import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import MultiPicker from 'rmc-picker/lib/MultiPicker';
import Picker from 'rmc-picker/lib/Picker';

/** actions */
import { getPastFtp } from '../actions/FtpDataAction';

type Props = {
    selectFtp: (ftp: number) => void;
}

/**
 * Ftppicker
 * 100～500Wまでの選択
 */
const Ftppicker = ({ selectFtp }: Props) => {
    const [, setError] = useState();
    const [selectedFtp, setSelectedFtp] = useState([0, 0, 0, 0]);
    // 選択できるFTP値(100~500)
    const integerList = [...Array(401)].map((v, i) => i + 100);

    /** 初期設定 */
    useEffect(() => {
        let pastFtp = 0;
        // 直近のFTPを初期表示
        getPastFtp().then(ftp => {
            // FTP設定が無い場合
            if (ftp < 100 || 500 < ftp) {
                // 初期値は200Wとする
                pastFtp = 200;
            } else {
                pastFtp = ftp;
            }
            // 初期体重設定
            setSelectedFtp([pastFtp, 0]);
            selectFtp(pastFtp);
        }).catch(error => {
            setError(error);
        });
    }, []);

    const onChange = (changeValue: [number, number]) => {
        setSelectedFtp(changeValue);
        selectFtp(changeValue[0]);
    }
    return (
        <MultiPicker
            selectedValue={selectedFtp}
            onValueChange={onChange}>
            <Picker>
                {integerList.map(integer => { return (<Picker.Item value={integer} key={integer} >{integer}</Picker.Item>) })}
            </Picker>
            <Text>W</Text>
        </MultiPicker>
    );
}

export default Ftppicker;
