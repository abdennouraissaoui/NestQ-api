import React from 'react';
import { Typography } from "antd"
import {
	PieChart,
	ResponsiveContainer,
	Tooltip,
	Pie,
	Cell,
	Legend
} from "recharts"

const RADIAN = Math.PI / 180;                    


const renderLabel = ({ name, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x  = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy  + radius * Math.sin(-midAngle * RADIAN);
   
	return (
	  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
			{/* {name} */}
			{`${(percent * 100).toFixed(0)}%`}
	  </text>
	);
}

const CustomPieChart = ({ data, colors, title }) => {

	return (
		<div style={{ background: "#31373A" }}>
			<Typography.Title  level={4} style={{color:"white", display:"inline-block"}} >
				{title}
			</Typography.Title>
			<ResponsiveContainer width='100%' aspect={3.0 / 3.0}>
				<PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
					<Tooltip formatter={label => label + "%"} />
					<Legend/>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						label={renderLabel}
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

