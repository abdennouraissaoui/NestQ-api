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



const CustomLineChart = ({ formatTick, linesSettings, dataPoints }) => {
    return (
        <ResponsiveContainer width='100%' aspect={5.0 / 3.0}>
            <LineChart data={dataPoints} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="Index" domain={['auto', 'auto']} />
                <YAxis domain={['auto', 'auto']} tickFormatter={formatTick} />
                <Tooltip />
                <Legend iconType="plainline" height="30%"/>
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