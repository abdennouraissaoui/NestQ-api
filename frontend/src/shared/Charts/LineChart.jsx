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



const CustomLineChart = ({ formatTick, linesSettings, dataPoints, xlabel, ylabel }) => {
    return (
        <ResponsiveContainer width='100%' aspect={5.0 / 3.0}>
            <LineChart data={dataPoints} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="Index" domain={['auto', 'auto']} label={xlabel} />
                <YAxis
                    domain={['auto', 'auto']}
                    tickFormatter={formatTick}
                    label={{ value: ylabel, angle: -90, position: 'left' }}
                />
                <Tooltip />
                <Legend iconType="plainline" />
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



