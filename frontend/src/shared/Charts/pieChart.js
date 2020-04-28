import React from 'react';
import { Typography } from "antd"
import {
	PieChart,
	ResponsiveContainer,
	Tooltip,
	Pie,
	Cell
} from "recharts"


const CustomPieChart = ({ data, colors, title }) => {

	return (
		<div style={{ background: "#31373A" }}>
			<Typography.Title  level={4} style={{color:"white", display:"inline-block"}} >
				{title}
			</Typography.Title>
			<ResponsiveContainer width='100%' aspect={3.0 / 3.0}>
				<PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
					<Tooltip formatter={label => label + "%"} />
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						label={(entry) => <text>entry.name</text>}
						labelLine={false}
						isAnimationActive={false}
					>
						{
							data.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]} />)
						}

					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}


export default CustomPieChart;

// <CanvasJSChart options = {options}/>
// const options = {
// 	theme: "dark2",
// 	// animationEnabled: true,
// 	title:{
// 		text: title,
// 		fontSize: 17
// 	},
// 	data: [{
// 		type: "pie",
// 		toolTipContent: "{label}: <strong>{y}%</strong>",
// 		indexLabelPlacement: "inside",
// 		dataPoints: data
// 	}]
// }