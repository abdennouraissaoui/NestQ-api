import React from 'react';
import CanvasJSReact from './canvasjs.react';


let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({data, title }) => {
	
	const options = {
		theme: "dark2",
		// animationEnabled: true,
		title:{
			text: title
		},
		data: [{
			type: "pie",
			showInLegend: true,
			legendText: "{label}",
			toolTipContent: "{label}: <strong>{y}%</strong>",
			indexLabelPlacement: "inside",
			dataPoints: data
		}]
	}
	return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
}


export default PieChart;