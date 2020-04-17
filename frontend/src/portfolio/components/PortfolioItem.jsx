import React, { useState } from 'react'
import Card from '../../shared/Card/Card'
import DataFormatter from "../../shared/utils/DataFormatter"
import PieChart from "../../shared/Charts/pieChart"
import PortfolioForm from "./PortfolioForm"
import { Button, Spin, Modal, Popconfirm } from "antd"
import { StockOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook"


const PortfolioItem = ({ name, holdings, allocation, rebalancingFrequency, optimizationStartDate, optimizationEndDate, onDelete, onEdited }) => {
    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const openEditForm = () => setEditFormIsOpen(true)
    const closeEditForm = () => setEditFormIsOpen(false)
    let { isLoading, sendRequest } = useHttpClient();
    const confirmDeleteHander = async () => {
        try {
            await sendRequest(`/api/portfolio/${encodeURIComponent(name)}`, "DELETE")
            onDelete(name)
        } catch (err) {
        }
    }
    let portfolioCard = (
        <Card className="tc ma3 dib br3 pad3 bw2 shadow-5">
            <PieChart title={name} data={DataFormatter.toPieChartFormat(holdings)} />
            <div>
                <Link to={`/analytics/portfolio/${encodeURIComponent(name)}`}>
                    <Button icon={<StockOutlined />} className="ma2 ml4" size="large" type="primary"> Analyze </Button>
                </Link>
                <Button icon={<EditOutlined />} className="ma2" size="large" type="dashed" onClick={openEditForm} />
                <Popconfirm
                    title="Are you sure you want to delete this portfolio?"
                    onConfirm={confirmDeleteHander}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined />} className="ma2 mr4" size="large" danger />
                </Popconfirm>
            </div>
        </Card>)
    return (
        <React.Fragment>
            <Modal
                visible={editFormIsOpen}
                onCancel={closeEditForm}
                title="Edit the portfolio"
                footer={false}
            >
                <div>
                    <PortfolioForm
                        closeForm={closeEditForm}
                        name={name}
                        holdings={DataFormatter.toListOfHoldings(holdings)}
                        allocation={allocation}
                        optimizationStartDate={optimizationStartDate}
                        optimizationEndDate={optimizationEndDate}
                        rebalancingFrequency={rebalancingFrequency}
                        onEdited={onEdited}
                    />
                </div>
            </Modal>
            {isLoading ? <Spin size="large"> {portfolioCard} </Spin> : portfolioCard}
        </React.Fragment>
    )
}
export default PortfolioItem;
