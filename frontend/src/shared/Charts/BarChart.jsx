import React from "react"
import {
    BarChart,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar
} from "recharts"

const CustomBarChart = ({ data, tickFormatter }) => {
    console.log(data)
    return (
        <ResponsiveContainer width={"100%"} aspect={5.0 / 3.0}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis dataKey="value" tickFormatter={tickFormatter}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey={"value"} fill="#06ACB0"/>
                {/* {data.map((entry, index) => {
                    return 
                })} */}
            </BarChart>
        </ResponsiveContainer>
    )
}
export default CustomBarChart