import React from "react"
import { Table } from "antd"

const RiskMetrics = ({ risk_metrics }) => {
    return (
        <React.Fragment>
            {risk_metrics && <Table bordered pagination={false} 
                size="middle"
                align="center" dataSource={risk_metrics.rows} columns={risk_metrics.columns} />}
        </React.Fragment>

    )
}

export default RiskMetrics;