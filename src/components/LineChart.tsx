import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Line } from 'react-chartjs-2';

/** configs */
import { PointDataParam } from '../configs/Types';

type LineChartProps = {
    dispData: PointDataParam[],
    dataLabel: string,
}

const LineChart: FC<LineChartProps> = ({ dispData, dataLabel }: LineChartProps) => {

    const data = {
        datasets: [
            {
                fill: true,
                lineTension: 0.2,
                backgroundColor: 'rgba(222, 143, 24,0.4)',
                borderColor: 'rgba(222, 143, 24,1)',
                pointBorderWidth: 10,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(222, 143, 24,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: dispData,
            }
        ]
    };
    const options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'YYYY/M/D'
                    }
                },
                ticks: {
                    maxTicksLimit: 12
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: dataLabel
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        // ツールチップ
        tooltips: {
            callbacks: {
                // タイトルを削除
                title: () => {
                    return '';
                },
                // 中身を編集
                beforeBody: (tooltipItem: any, data: any) => {
                    const pointedData = data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index];
                    const date = new Date(pointedData.x);
                    return '記録日時: ' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '\n'
                        + 'FTP: ' + pointedData.ftp + ' W\n'
                        + '体重: ' + pointedData.weight.toFixed(1) + ' kg\n'
                        + 'PWR: ' + pointedData.pwr.toFixed(1) + ' W/kg\n'
                        + 'コンディション: ' + pointedData.condition;
                },
                // ラベルを削除
                label: () => {
                    return '';
                }
            },
            bodyFontSize: 15
        },
        legend: {
            // 凡例を表示しない
            display: false,
        },
        maintainAspectRatio: false
    }

    return (
        <div style={{ height: '60vh', width: '90vw' }}>
            <Line data={data} options={options} />
        </div>
    );
}

const styles = StyleSheet.create({
    lineChart: {
        flex: 1,
        flexDirection: 'row',
        margin: 16
    },
});

export default LineChart;
