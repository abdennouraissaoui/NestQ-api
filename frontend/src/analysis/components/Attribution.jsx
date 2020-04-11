import React from "react"
import Table from "../../shared/Table/Table"


const Attribution = ({ ff_exp }) => {
    return (
        <Table rows={ff_exp.rows} columns={ff_exp.columns} />
    )
}

export default Attribution;