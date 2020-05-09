import React from 'react';
import CanvasJSReact from './canvasjs.react';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;


const PieChart = ({ data, title, colors }) => {

	const options = {
		theme: "dark2",
		// animationEnabled: true,
		title: {
			text: title,
			fontSize: 17
		},
		colorSet: "customColorSet1",
		// toolTip: {
		// 	fontC
		// },
		data: [{
			type: "pie",
			toolTipContent: "{label}: <strong>{y}%</strong>",
			indexLabelPlacement: "inside",
			dataPoints: data
		}]
	}
	return (
		<div style={{background: "#31373A"}}>
			<div style={{ borderBottomLeftRadius: "30%", overflow: "hidden" }}>
				<CanvasJSChart options={options} />
			</div>
		</div>

	);
}


export default PieChart;