import React from "react"
import Table from "../../shared/Table/Table"


const RiskMetrics = ({ risk_metrics }) => {
    return (
        <React.Fragment>
            {risk_metrics && <Table rows={risk_metrics.rows} columns={risk_metrics.columns} />}
        </React.Fragment>
        
    )
}

export default RiskMetrics;