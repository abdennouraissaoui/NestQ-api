import React from "react"
import LineChart from "../../shared/Charts/LineChart"
import DataFormatter from "../../shared/utils/DataFormatter"
import { Table, Typography } from "antd"


const Performance = ({ inv_growth, drawdowns, calendar_rets }) => {
    return (
        <React.Fragment >
            {drawdowns &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Investment Growth of a $1,000 investment </Typography.Title>
                    <LineChart
                        datapoints={DataFormatter.toLineChart(inv_growth)}
                        // title="Investment Growth of a $1,000 investment"
                        prefix="$"
                    />
                </React.Fragment>
            }
            <br />
            <br />

            {drawdowns &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Drawdowns </Typography.Title>
                    <LineChart
                        datapoints={DataFormatter.toLineChart(drawdowns)}
                        suffix="%"
                    />
                </React.Fragment>
            }
            <br />
            <br />

            {calendar_rets &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Calendar Year returns </Typography.Title>
                    <Table
                        pagination={false}
                        size="middle"
                        align="center"
                        tableLayout="fixed"
                        bordered
                        dataSource={calendar_rets.rows}
                        columns={calendar_rets.columns}
                    />
                </React.Fragment>
            }

        </React.Fragment>

    )
}

export default Performance;