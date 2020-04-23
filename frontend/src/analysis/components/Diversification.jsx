import React from "react"
import Table from "../../shared/Table/Table"
import DataFormatter from "../../shared/utils/DataFormatter"
import PieChart from "../../shared/Charts/pieChart"
import { Typography } from "antd"

const Diversification = ({ correlation, pca }) => {
    return (
        <React.Fragment>
            {pca && <PieChart
                title={"Principal Component Analysis"}
                data={DataFormatter.toPieChartFormat(pca)}
            />}
            {correlation &&
                <React.Fragment>
                    <Typography.Title level={3} className="center"> Correlation Analysis </Typography.Title>
                    <Table rows={correlation.rows} columns={correlation.columns} />
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Diversification;