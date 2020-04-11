import React from "react"
import LineChart from "../../shared/Charts/LineChart"
import DataFormatter from "../../shared/utils/DataFormatter"
import Table from "../../shared/Table/Table"


const Performance = ({ inv_growth, drawdowns, calendar_rets}) => {
    return (
        <React.Fragment >
            <LineChart
                datapoints={DataFormatter.toLineChart(inv_growth)}
                title="Investment Growth $1,000 invested"
            />
            <br/>
            <br/>  
            <LineChart
                datapoints={DataFormatter.toLineChart(drawdowns)}
                title="Drawdowns"
            />

            <br/>
            <br/>
            <h1 className="tc">Calendar Year returns</h1>
            <Table rows={calendar_rets.rows} columns={calendar_rets.columns}/>
        </React.Fragment>

    )
}

export default Performance;