import React from "react"
import DataFormatter from "../../shared/utils/DataFormatter"
import BarChart from "../../shared/Charts/BarChart"
import CorrelationMatrix from "../../shared/Charts/CorrelationMatrix"
import { Typography, Table } from "antd"

const Diversification = ({ correlation, pca }) => {
    return (
        <React.Fragment>
            {pca &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Principal Component Analysis </Typography.Title>
                    <BarChart
                        data={DataFormatter.toCategoricalChart(pca)}
                        tickFormatter={tick => tick + "%"}
                    />
                </React.Fragment>}

                <br/>
                <br/>
            {correlation &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Correlation Analysis </Typography.Title>
                    <CorrelationMatrix
                        data={correlation}
                        // pagination={false}
                        // size="middle"
                        // align="center" bordered dataSource={correlation.rows} columns={correlation.columns} 
                    />
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Diversification;