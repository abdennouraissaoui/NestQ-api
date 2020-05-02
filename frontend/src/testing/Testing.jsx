import React from "react"
import ReactApexChart from 'react-apexcharts'

function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = "w" + (i + 1).toString();
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}
const series = [{
    'name': 'Asd askdl asd alsdk',
    'data': [{ 'x': 'Asd askdl asd alsdk', 'y': 84.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 88.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': -59.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 21.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 100.0 }]
},
{
    'name': 'Asd askdl asd alsdk',
    'data': [{ 'x': 'Asd askdl asd alsdk', 'y': 32.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 34.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 31.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 100.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 21.0 }]
},
{
    'name': 'Asd askdl asd alsdk',
    'data': [{ 'x': 'Asd askdl asd alsdk', 'y': -59.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': -52.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 100.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 31.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': -59.0 }]
},
{
    'name': 'Asd askdl asd alsdk',
    'data': [{ 'x': 'Asd askdl asd alsdk', 'y': 96.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 100.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': -52.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 34.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 88.0 }]
},
{
    'name': 'Asd askdl asd alsdk',
    'data': [{ 'x': 'Asd askdl asd alsdk', 'y': 100.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 96.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': -59.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 32.0 },
    { 'x': 'Asd askdl asd alsdk', 'y': 84.0 }]
}]




const corrColors = {
    "No correlation": "#f0f6ff",
    "Low (+)": "#adceff",
    "Medium (+)": "#63a2ff",
    "High (+)": "#0067ff",
    "Low (-)": "#FF9A9A",
    "Medium (-)": "#FF5D5D",
    "High (-)": "#FF2D00",
}

const options = {
    chart: {
        type: 'heatmap',
    },
    dataLabels: {
        style: {

            colors: ["#000000"]
        }
    },
    plotOptions: {
        heatmap: {
            colorScale: {
                ranges: [{
                    from: -100,
                    to: -70,
                    color: corrColors["High (-)"],
                    name: 'High (-)',
                },
                {
                    from: -69,
                    to: -50,
                    color: corrColors["Medium (-)"],
                    name: 'Medium (-)',
                },
                {
                    from: -49,
                    to: -15,
                    color: corrColors["Low (-)"],
                    name: 'Low (-)',
                },
                {
                    from: -14,
                    to: 14,
                    color: corrColors["No correlation"],
                    name: 'No correlation',
                },
                {
                    from: 15,
                    to: 49,
                    color: corrColors["Low (+)"],
                    name: 'Low (+)',
                },
                {
                    from: 50,
                    to: 69,
                    color: corrColors["Medium (+)"],
                    name: 'Medium (+)',
                },
                {
                    from: 70,
                    to: 100,
                    color: corrColors["High (+)"],
                    name: 'High (+)',
                }
                ]
            }
        }
    }
}

console.log(series)
const Testing = () => {
    return (
        <div style={{ margin: "auto" }}>
            <ReactApexChart
                options={options}
                series={series}
                type="heatmap"
            />
        </div>
    )
}
export default Testing