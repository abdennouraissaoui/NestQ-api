import React from "react"
// import CanvasJSReact from './canvasjs.react';
// let CanvasJSChart = CanvasJSReact.CanvasJSChart;
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
    Line
} from "recharts"


// const formatTick = (tick) => "$" + tick

// const linesSettings = {
//     'AAPL': { 'color': '#06ACB0', 'width': 1.6 },
//     'GLD': { 'color': '#FF672E', 'width': 4 },
//     'IEF': { 'color': '#676766', 'width': 2.5 },
//     'QQQ': { 'color': '#FFCE50', 'width': 1.3 },
//     'SPY': { 'color': '#006C52', 'width': 1.3 }
// }

// const dataPoints = [{
//     'AAPL': 1.06,
//     'GLD': 1.03,
//     'IEF': 1.01,
//     'QQQ': 1.09,
//     'SPY': 1.09,
//     'Index': '2019-01-31'
// },
// {
//     'AAPL': 1.1,
//     'GLD': 1.02,
//     'IEF': 1.0,
//     'QQQ': 1.13,
//     'SPY': 1.12,
//     'Index': '2019-02-28'
// },
// {
//     'AAPL': 1.21,
//     'GLD': 1.01,
//     'IEF': 1.03,
//     'QQQ': 1.17,
//     'SPY': 1.14,
//     'Index': '2019-03-31'
// },
// {
//     'AAPL': 1.28,
//     'GLD': 1.0,
//     'IEF': 1.02,
//     'QQQ': 1.23,
//     'SPY': 1.19,
//     'Index': '2019-04-30'
// },
// {
//     'AAPL': 1.11,
//     'GLD': 1.02,
//     'IEF': 1.06,
//     'QQQ': 1.13,
//     'SPY': 1.11,
//     'Index': '2019-05-31'
// },
// {
//     'AAPL': 1.26,
//     'GLD': 1.1,
//     'IEF': 1.07,
//     'QQQ': 1.22,
//     'SPY': 1.18,
//     'Index': '2019-06-30'
// },
// {
//     'AAPL': 1.36,
//     'GLD': 1.1,
//     'IEF': 1.07,
//     'QQQ': 1.25,
//     'SPY': 1.21,
//     'Index': '2019-07-31'
// },
// {
//     'AAPL': 1.33,
//     'GLD': 1.19,
//     'IEF': 1.11,
//     'QQQ': 1.22,
//     'SPY': 1.19,
//     'Index': '2019-08-31'
// },
// {
//     'AAPL': 1.44,
//     'GLD': 1.15,
//     'IEF': 1.1,
//     'QQQ': 1.23,
//     'SPY': 1.21,
//     'Index': '2019-09-30'
// },
// {
//     'AAPL': 1.6,
//     'GLD': 1.17,
//     'IEF': 1.1,
//     'QQQ': 1.29,
//     'SPY': 1.24,
//     'Index': '2019-10-31'
// },
// {
//     'AAPL': 1.71,
//     'GLD': 1.14,
//     'IEF': 1.09,
//     'QQQ': 1.34,
//     'SPY': 1.28,
//     'Index': '2019-11-30'
// },
// {
//     'AAPL': 1.89,
//     'GLD': 1.18,
//     'IEF': 1.08,
//     'QQQ': 1.39,
//     'SPY': 1.31,
//     'Index': '2019-12-31'
// },
// {
//     'AAPL': 1.99,
//     'GLD': 1.23,
//     'IEF': 1.12,
//     'QQQ': 1.44,
//     'SPY': 1.32,
//     'Index': '2020-01-31'
// },
// {
//     'AAPL': 1.76,
//     'GLD': 1.22,
//     'IEF': 1.15,
//     'QQQ': 1.35,
//     'SPY': 1.21,
//     'Index': '2020-02-29'
// },
// {
//     'AAPL': 1.64,
//     'GLD': 1.22,
//     'IEF': 1.2,
//     'QQQ': 1.25,
//     'SPY': 1.06,
//     'Index': '2020-03-31'
// }]

const CustomLineChart = ({ formatTick, linesSettings, dataPoints }) => {
    return (
        <ResponsiveContainer width='100%' aspect={5.0 / 3.0}>
            <LineChart data={dataPoints} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="Index" domain={['auto', 'auto']} />
                <YAxis domain={['auto', 'auto']} tickFormatter={formatTick} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                {Object.keys(linesSettings).map((line, index) => {
                    return <Line
                        key={index}
                        dataKey={line}
                        stroke={linesSettings[line].color}
                        dot={false}
                        strokeWidth={linesSettings[line].width}
                    />
                })}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default CustomLineChart;



    // const options = {
    //     animationEnabled: true,
    //     title: {
    //         text: title,
    //         fontSize: 17
    //     },
    //     animationDuration: 1000,
    //     axisY: {
    //         prefix: prefix || "",
    //         suffix: suffix || "",
    //         includeZero: false
    //     },
    //     toolTip: {
    //         shared: true
    //     },
    //     zoomEnabled: true,
    //     theme: "light2",
    //     data: datapoints
    // }