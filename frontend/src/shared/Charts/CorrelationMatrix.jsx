import React from "react"
import ReactApexChart from 'react-apexcharts'
import {
    // BrowserView,
    // MobileView,
    // isBrowser,
    isMobile
  } from "react-device-detect";

const corrColors = {
    "Insignificant": "#f0f6ff",
    "Low (+)": "#adceff",
    "Medium (+)": "#63a2ff",
    "High (+)": "#0067ff",
    "Low (-)": "#FF9A9A",
    "Medium (-)": "#FF5D5D",
    "High (-)": "#FF2D00",
}

const options = {
    dataLabels: {
        style: {
            colors: ["#000000"]
        }
    },
    xaxis:{
        labels:{
            show: isMobile ? false : true,
            maxHeight:200,
            trim:true
        }
    },
    yaxis:{
        labels:{
            show:isMobile ? false : true,
            maxWidth: 300
        }
    },
    plotOptions: {
        heatmap: {
            colorScale: {
                ranges: [{
                    from: -1,
                    to: -.70,
                    color: corrColors["High (-)"],
                    name: 'High (-)',
                },
                {
                    from: -.69,
                    to: -.50,
                    color: corrColors["Medium (-)"],
                    name: 'Medium (-)',
                },
                {
                    from: -.49,
                    to: -.15,
                    color: corrColors["Low (-)"],
                    name: 'Low (-)',
                },
                {
                    from: -.14,
                    to: .14,
                    color: corrColors["Insignificant"],
                    name: 'Insignificant',
                },
                {
                    from: .15,
                    to: .49,
                    color: corrColors["Low (+)"],
                    name: 'Low (+)',
                },
                {
                    from: .50,
                    to: .69,
                    color: corrColors["Medium (+)"],
                    name: 'Medium (+)',
                },
                {
                    from: .70,
                    to: 1,
                    color: corrColors["High (+)"],
                    name: 'High (+)',
                }
                ]
            }
        }
    }
}

const CorrelationMatrix = ({ data }) => {
    return (
        <ReactApexChart
            options={options}
            series={data}
            type="heatmap"
        />
    )
}
export default CorrelationMatrix