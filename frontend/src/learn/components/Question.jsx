import React from "react"
import { Card, Modal, Typography, Space } from "antd"

const Question = ({ question, answer, description, wordCount }) => {

    const displayAnswer = () => {
        Modal.info({
            title: question,
            content: (
                <p>{answer}</p>
            ),
            onOk() { },
        });
    }

    return (
        <React.Fragment>
            <Card hoverable style={{ margin: "10px", width: "100%", maxWidth: "250px" }} onClick={displayAnswer}>
                <Space direction="vertical" style={{textAlign:"left"}}>
                    <Typography.Text style={{ color: "#6e7272", fontWeight: "bold", fontSize:"17px" }}>
                        {question}
                    </Typography.Text>
                    <Typography.Text style={{ color: "#909090", fontSize:"15px" }}>
                        {description}
                    </Typography.Text>
                </Space>
            </Card>

        </React.Fragment>

    )
}

export default Question;
