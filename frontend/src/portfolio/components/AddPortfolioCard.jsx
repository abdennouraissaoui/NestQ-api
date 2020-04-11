import React from "react"
import Card from "../../shared/Card/Card"
import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"

const AddPortfolioCard = ({ openPortForm }) => {
    return (
        <Card className="tc ma3 dib br3 pad3 bw2 shadow-5">
            <Button style={{ width: "287px", height: "455px" }} size="large" type="dashed" onClick={openPortForm} icon={<PlusOutlined />}> Create </Button>
        </Card>
    )
}
export default AddPortfolioCard;