import React from "react"
import { Table, Typography } from "antd"

const Attribution = ({ ff_exp }) => {
    return (
        <React.Fragment>
            <Typography.Title level={3} className="center"> Regression on the Fama/French Factors  </Typography.Title>
            {ff_exp && <Table pagination={false}
                size="middle"
                align="center" bordered dataSource={ff_exp.rows} columns={ff_exp.columns} />}
        </React.Fragment>

    )
}

export default Attribution;