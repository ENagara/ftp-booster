import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { Divider, Text } from '@ui-kitten/components';
import Hyperlink from 'react-native-hyperlink';

const WhatFtp = () => {
    const ftpText = 'Functional Threshold Power＝機能的作業閾値パワー。'
        + '1時間継続できる上限のパワー値。持久的運動能力の指標として使わ'
        + 'れる。この値を基に「レベル（L）」や「ゾーン（Z）」と呼ばれるト'
        + 'レーニング強度を設定する。トレーニングの効果や体調によって常に'
        + '変化するので、固定的な値ではない。よって、トレーニングの進捗に'
        + '合わせて、定期的に測定する必要がある。測定頻度は1ヶ月～2ヶ月に'
        + '一度が一般的。\n\n'
        + '計測方法はコーガン式が主流で、20分間の全力運動をした際の平均パ'
        + 'ワー（20分のMMP）×0.95で求める。\n'
        + 'そのほかの計測方法として、ランプテストがある。一定のペースで負'
        + '荷を上げ、ラスト1分間の平均パワー×0.75で求める。\n\n'
        + 'FTP＝運動能力ではあるが、必ずしもFTP＝速さとはならない。FTPはあ'
        + 'くまで速さを構成する一要素であり、速く走るためにはFTPの他にスキ'
        + 'ルやフォーム、ペース配分や、レースであれば駆け引きなど他の要素も'
        + '大きく影響する。\n'
        + 'FTPはライダーの戦闘能力を表す、とよく表現されるが、戦闘能力を「活'
        + 'かす」ことができて、初めて「速さ」に繋がる。FTPを活かす能力が高け'
        + 'れば、低いパワー値でも速く走ることができるので、FTPの向上だけでな'
        + 'く、走りの経済性＝エコノミーを高める取り組みも同時に必要である。\n\n';
    const pwrText = '体重1kgあたりのパワー値。Power Weight Ratio＝PWRと略す'
        + '。パワー値÷体重で計算し、W/kgで表す。登坂抵抗が発生するヒルクラ'
        + 'イムでは、このPWRがタイムに影響する。逆に平地ではPWRよりもパワー'
        + 'の絶対値の方が重要である。同じ300Wを出せるライダーが2人いても、片'
        + 'や体重60kg、片や体重70kgであれば、前者は5W/kg、後者は4.26W/kgとな'
        + 'り、前者の方が登坂に有利である。\n\n';
    const endText = '継続的にFTPを記録する上で重要なのは「同じ方式」で測定し'
        + 'たものを記録するということである。方式によっては自身の得意不得意が'
        + 'あるため、計測値にばらつきが出てしまうためである。こうして計測した'
        + '値を記録することで自身の成長を確信し、モチベーションアップにつなが'
        + 'るのではないだろうか。\n\n';

    const openUrl = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(
                "エラー",
                "このページを開ませんでした",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text category='h4'>FTP</Text>
                <Divider />
                <Text>{ftpText}</Text>

                <Text category='h4'>PWR</Text>
                <Divider />
                <Text>{pwrText}</Text>

                <Text category='h4'>最後に</Text>
                <Divider />
                <Text>{endText}</Text>

                <Text category='h4'>参考サイトさま</Text>
                <Hyperlink
                    linkStyle={{ color: '#2980b9', fontWeight: 'bold' }}
                    onPress={(url: string, text: string) => {
                        openUrl(url);
                    }}>
                    <Text>【パワトレ】パワートレーニング用語集 - Y's Road</Text>
                    <Text>http://www.ysroad.net/shopnews/detail.php?bid=402150</Text>
                    <Text>MAPテストでかんたんにFTPを推定する方法 - じてトレ</Text>
                    <Text>http://www.overlander.co.jp/jitetore/jitetorehint20120108.html</Text>
                </Hyperlink>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    button: {
        margin: 4,
    },
});

export default WhatFtp;
