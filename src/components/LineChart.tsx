import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Line } from 'react-chartjs-2';

/** configs */
import { PointDataParam } from '../configs/Types';

const htmlContent = `
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
    </head>
  <body style="margin: 0; padding: 0;">
    <canvas id="chart" height="300"></canvas>
    <script>[INJECTED_SCRIPT]</script>
  </body>
</html>
`;
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
                data: [INJECTED_DATA]
            },
        ],
    };
    var options = {
        scales: {
            xAxes: [{
                ticks: {
                    callback: function(milliseconds) {return moment(milliseconds).format("YYYY/M/D")}
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '[INJECTED_DATALABEL]'
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
                    return '記録日時: ' + moment(pointedData.x).format("YYYY/M/D") + '\\n'
                     + 'FTP: ' + pointedData.ftp + ' W\\n'
                     + '体重: ' + pointedData.weight.toFixed(1) + ' kg\\n'
                     + 'PWR: ' + pointedData.pwr.toFixed(1) + ' W/kg\\n'
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

type LineChartProps = {
    dispData: PointDataParam[],
    dataLabel: string,
}

const LineChart: React.FC<LineChartProps> = ({ dispData, dataLabel }: LineChartProps) => {

    if (Platform.OS == 'web') {
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
    else {
        const strDispData = JSON.stringify(dispData);
        const replaseJs = js.replace('[INJECTED_DATA]', strDispData).replace('[INJECTED_DATALABEL]', dataLabel);
        const replaseHtmlContent = htmlContent.replace('[INJECTED_SCRIPT]', replaseJs);

        return (
            <View style={styles.lineChart}>
                <WebView
                    source={{ html: replaseHtmlContent }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lineChart: {
        flex: 1,
        flexDirection: 'row',
        margin: 16
    },
});

export default LineChart;
