import React from "react"
import Table from "../../shared/Table/Table"


const Attribution = ({ ff_exp }) => {
    return (
        <React.Fragment>
            {ff_exp && <Table rows={ff_exp.rows} columns={ff_exp.columns} />}
        </React.Fragment>

    )
}

export default Attribution;