import React from "react"
import LineChart from "../../shared/Charts/LineChart"
import { Table, Typography } from "antd"


const Performance = ({ inv_growth, drawdowns, calendar_rets, portSimulation }) => {
    return (
        <React.Fragment >
            {inv_growth &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Compounded growth of a $1,000 investment </Typography.Title>
                    <LineChart
                        dataPoints={inv_growth.dataPoints}
                        linesSettings={inv_growth.linesSettings}
                        formatTick={tick => "$" + tick}
                    />
                </React.Fragment>
            }
            <br />
            <br />

            {drawdowns &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Drawdowns </Typography.Title>
                    <LineChart
                        dataPoints={drawdowns.dataPoints}
                        linesSettings={drawdowns.linesSettings}
                        formatTick={tick => tick + "%"}
                    />
                </React.Fragment>
            }
            <br />
            <br />

            {calendar_rets &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Annual Returns </Typography.Title>
                    <Table
                        pagination={false}
                        size="middle"
                        align="center"
                        bordered
                        dataSource={calendar_rets.rows}
                        columns={calendar_rets.columns}
                    />
                </React.Fragment>
            }

            <br/>
            <br/>
            {portSimulation &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Monte Carlo simulation of $1,000 invested in the portfolio </Typography.Title>
                    <LineChart
                        dataPoints={portSimulation.dataPoints}
                        linesSettings={portSimulation.linesSettings}
                        formatTick={tick => "$" + tick}
                    />
                </React.Fragment>
            }

        </React.Fragment>

    )
}

export default Performance;