import React from "react"
import LineChart from "../../shared/Charts/LineChart"
import DataFormatter from "../../shared/utils/DataFormatter"
import Table from "../../shared/Table/Table"


const Performance = ({ inv_growth, drawdowns, calendar_rets }) => {
    return (
        <React.Fragment >
            {drawdowns && <LineChart
                datapoints={DataFormatter.toLineChart(inv_growth)}
                title="Investment Growth of a $1,000 investment"
                prefix="$"
            />}
            <br />
            <br />

            {drawdowns && <LineChart
                datapoints={DataFormatter.toLineChart(drawdowns)}
                title="Drawdowns"
                suffix="%"
            />}
            <br />
            <br />
            
            {calendar_rets && <h1 className="tc">Calendar Year returns</h1> && <Table rows={calendar_rets.rows} columns={calendar_rets.columns} />}

        </React.Fragment>

    )
}

export default Performance;