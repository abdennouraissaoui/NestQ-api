import React, { useState } from 'react'
import Card from '../../shared/Card/Card'
import DataFormatter from "../../shared/utils/DataFormatter"
import PieChart from "../../shared/Charts/pieChart"
import PortfolioForm from "./PortfolioForm"
import { Button, Modal, Popconfirm } from "antd"
import { StockOutlined, DeleteOutlined, EditOutlined, CalculatorOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook"


const PortfolioItem = ({ name, holdings, allocation, rebalancingFrequency, optimizationStartDate, optimizationEndDate, targetReturn, targetVolatility, onDelete, onEdited }) => {
    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const openEditForm = () => setEditFormIsOpen(true)
    const closeEditForm = () => setEditFormIsOpen(false)


    let { sendRequest } = useHttpClient();
    const confirmDeleteHander = async () => {
        try {
            await sendRequest(`/api/portfolio/${encodeURIComponent(name)}`, "DELETE")
            onDelete(name)
        } catch (err) {
        }
    }
    
    let portfolioCard = (
        <Card className="tc ma3 dib br3 pad3 bw2 shadow-2">
            <PieChart title={name} data={DataFormatter.toPieChartFormat(holdings)} />
            <div>
                <Link to={`/analytics/portfolio/${encodeURIComponent(encodeURI(name))}`}>
                    <Button
                        icon={<StockOutlined />}
                        className="ma1"
                        size="large"
                        type="primary"
                    > Analyze </Button>
                </Link>
                <Link to={`/analytics/portfolio-comparison/${encodeURIComponent(encodeURI(name))}`}>
                    <Button
                        icon={<CalculatorOutlined />}
                        className="ma1"
                        size="large"
                        type="primary"
                    > Compare </Button>
                </Link>

                <Button icon={<EditOutlined />} className="ma1 mv2" size="large" type="dashed" onClick={openEditForm} />
                <Popconfirm
                    title="Are you sure you want to delete this portfolio?"
                    onConfirm={confirmDeleteHander}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined />} className="ma1" size="large" danger />
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
                        targetReturn={targetReturn}
                        targetVolatility={targetVolatility}
                        onEdited={onEdited}
                    />
                </div>
            </Modal>
            {portfolioCard}
        </React.Fragment>
    )
}
export default PortfolioItem;
