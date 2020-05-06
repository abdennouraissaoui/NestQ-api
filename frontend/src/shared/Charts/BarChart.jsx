import React from "react"
import {
    BarChart,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Label
} from "recharts"



const CustomBarChart = ({ data, tickFormatter, ylabel, xlabel }) => {
    return (
        <ResponsiveContainer width={"100%"} aspect={6.0 / 3.0}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 15, bottom: 15 }}>
                <XAxis dataKey="label">
                    <Label value={xlabel} position="bottom" offset={0}/>
                </XAxis>
                <YAxis dataKey="y" tickFormatter={tickFormatter} label={{ value: ylabel, angle: -90, position: "left" }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey={"y"} fill="#06ACB0" />

            </BarChart>
        </ResponsiveContainer>
    )
}
export default CustomBarChart