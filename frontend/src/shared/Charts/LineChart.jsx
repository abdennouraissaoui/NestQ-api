import React from "react"
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


const LineChart = ({ datapoints, title }) => {

    const options = {
        animationEnabled: true,
        title: {
            text: title
        },
        animationDuration:1000,
        axisY: {
            prefix: "$",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        zoomEnabled:true,
        theme:"light2",
        data: datapoints
    }
    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
}

export default LineChart;