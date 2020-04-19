import React from "react"
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


const LineChart = ({ datapoints, title, prefix, suffix }) => {

    const options = {
        animationEnabled: true,
        title: {
            text: title,
            fontSize:17
        },
        animationDuration:1000,
        axisY: {
            prefix: prefix || "",
            suffix: suffix || "",
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