import React from "react"
import DataFormatter from "../../shared/utils/DataFormatter"
import PieChart from "../../shared/Charts/pieChart"
import { Typography, Table } from "antd"

const Diversification = ({ correlation, pca }) => {
    return (
        <React.Fragment>
            {pca &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Principal Component Analysis </Typography.Title>
                    <PieChart
                        data={DataFormatter.toPieChartFormat(pca)}
                    />
                </React.Fragment>}

                <br/>
                <br/>
            {correlation &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Correlation Analysis </Typography.Title>
                    <Table pagination={false}
                    tableLayout="fixed"
                        size="middle"
                        align="center" bordered dataSource={correlation.rows} columns={correlation.columns} />
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Diversification;