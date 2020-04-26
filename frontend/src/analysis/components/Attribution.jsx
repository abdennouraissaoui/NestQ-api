import React from "react"
import { Table } from "antd"

const Attribution = ({ ff_exp }) => {
    return (
        <React.Fragment>
            {ff_exp && <Table tableLayout="fixed" pagination={false}
                size="middle"
                align="center" bordered dataSource={ff_exp.rows} columns={ff_exp.columns} />}
        </React.Fragment>

    )
}

export default Attribution;