import React from 'react';
import { Platform, Text } from 'react-native';
import { Line } from 'react-chartjs-2';

const pointData =
    [{
        x: new Date('2020-09-11 12:15'),
        y: 190,
        weight: 58.8,
        pwr: 3.2,
        condition: '良好'
    }, {
        x: new Date('2020-9-25 15:10'),
        y: 225,
        weight: 57.9,
        pwr: 3.1,
        condition: '普通'
    }, {
        x: new Date('2020-10-2 19:30'),
        y: 200,
        weight: 57.9,
        pwr: 3.5,
        condition: '普通'
    }, {
        x: new Date('2020-10-3 22:59'),
        y: 250,
        weight: 55.0,
        pwr: 4.0,
        condition: '悪い'
    }];


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
            data: pointData
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
                    day: 'M/D'
                }
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'FTP[W]'
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
                return 'Day: ' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + '\n'
                    + 'FTP: ' + tooltipItem[0].yLabel + '\n'
                    + 'PWR: ' + pointedData.pwr + '\n'
                    + 'Condition: ' + pointedData.condition;
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

export default function LineChart() {

    if (Platform.OS == 'web') {
        return (
            <div style={{ height: '80vh', width: '90vw' }}>
                <Line data={data} options={options} />
            </div>
        );
    }

    else {
        return (
            <>
                <Text>androidtest</Text>
            </>
        );
    }
}
