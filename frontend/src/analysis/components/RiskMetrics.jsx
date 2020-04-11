import React from "react"
import Table from "../../shared/Table/Table"


const RiskMetrics = ({ risk_metrics}) => {
    return (
        <Table rows={risk_metrics.rows} columns={risk_metrics.columns} />
    )
}

export default RiskMetrics;