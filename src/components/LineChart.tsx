import React from 'react';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Line } from 'react-chartjs-2';

const htmlContent = `
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
    </head>
  <body style="margin: 0; padding: 0;">
    <canvas id="chart" height="300"></canvas>
  </body>
</html>
`;

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
                return '記録日時: ' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + '\n'
                    + 'FTP: ' + tooltipItem[0].yLabel + ' W\n'
                    + 'PWR: ' + pointedData.pwr + ' W/kg\n'
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

type Props = {
    selectedPeriodIndex: number;
    selectedDataOptinoIndex: number;
}

const LineChart: React.FC<Props>  = ({ selectedPeriodIndex, selectedDataOptinoIndex}:Props) => {
    const js = `
    var data = {
        datasets: [
            {
                showLine: true,
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
                data: [{
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
                    x: new Date('2020-10-5 22:59'),
                    y: 190,
                    weight: 55.0,
                    pwr: 4.0,
                    condition: '普通'
                }, {
                    x: new Date('2020-10-6 22:59'),
                    y: 280,
                    weight: 55.0,
                    pwr: 4.0,
                    condition: '悪い'
                }]
            },
        ],
    };
    var options = {
        scales: {
            xAxes: [{
                ticks: {
                    callback: function(milliseconds) {return moment(milliseconds).format("M/D")}
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
        tooltips: {
            callbacks: {
                title: function() {
                    return '';
                },
                beforeBody: function(tooltipItem, data) {
                    var pointedData = data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index];
                    var date = new Date(pointedData.x);
                    return '記録日時: ' + moment(pointedData.x).format("YYYY/M/D h:mm") + '\\n'
                     + 'FTP: ' + tooltipItem[0].yLabel + ' W\\n'
                     + 'PWR: ' + pointedData.pwr + ' W/kg\\n'
                     + 'コンディション: ' + pointedData.condition;
                },
                label: function() {
                    return '';
                }
            },
            bodyFontSize: 15
        },
        legend: {
            display: false,
        },
    };

    var ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: options,
    });
      `;

    if (Platform.OS == 'web') {
        return (
            <div style={{ height: '60vh', width: '90vw' }}>
                <Line data={data} options={options} />
            </div>
        );
    }

    else {
        return (
            <>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <WebView
                        allowFileAccess={true}
                        source={{ html: htmlContent }}
                        injectedJavaScript={js}
                        startInLoadingState
                    />
                </View>
            </>
        );
    }
}

export default LineChart;