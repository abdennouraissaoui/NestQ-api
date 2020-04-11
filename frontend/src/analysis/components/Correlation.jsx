import React from "react"
import Table from "../../shared/Table/Table"


const Correlation = ({correlation}) => {
    return (
        <Table rows={correlation.rows} columns={correlation.columns} />
    )
}

export default Correlation;