import React, { useState } from 'react'
import Card from '../../shared/Card/Card'
import DataFormatter from "../../shared/utils/DataFormatter"
import PieChart from "../../shared/Charts/pieChart"
import PortfolioForm from "./PortfolioForm"
import { Button, Modal, Popconfirm, Tooltip } from "antd"
import { StockOutlined, DeleteOutlined, EditOutlined, CalculatorOutlined, CopyOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook"


const PortfolioItem = ({ name, holdings, colors, allocation, rebalancingFrequency, optimizationStartDate, optimizationEndDate, targetReturn, targetVolatility, onDelete, onEdited, onCreated }) => {
    const [portfolioFormIsOpen, setPortfolioFormOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState()
    const openEditForm = () => {
        setIsEditMode(true)
        setPortfolioFormOpen(true)
    }
    const closePortfolioForm = () => setPortfolioFormOpen(false)

    const openDuplicateForm = () =>{
        setIsEditMode(false)
        setPortfolioFormOpen(true)
    }

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
            <PieChart title={name} colors={colors} data={DataFormatter.toCategoricalChart(holdings)} />
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
                <Tooltip title="Duplicate">
                    <Button icon={<CopyOutlined />} className="ma1 mv2" size="large" type="dashed" onClick={openDuplicateForm} />
                </Tooltip>
                <Tooltip title="Edit">
                    <Button icon={<EditOutlined />} className="ma1 mv2" size="large" type="dashed" onClick={openEditForm} />
                </Tooltip>
                <Popconfirm
                    title="Are you sure you want to delete this portfolio?"
                    onConfirm={confirmDeleteHander}
                    okText="Yes"
                    cancelText="No"
                >
                    <Tooltip title="Delete">
                    <Button icon={<DeleteOutlined />} className="ma1" size="large" danger />

                    </Tooltip>
                </Popconfirm>
            </div>
        </Card>)
    return (
        <React.Fragment>
            <Modal
                visible={portfolioFormIsOpen}
                onCancel={closePortfolioForm}
                title="Edit the portfolio"
                footer={false}
            >
                <div>
                    <PortfolioForm
                        closeForm={closePortfolioForm}
                        name={isEditMode? name : undefined}
                        holdings={DataFormatter.toListOfHoldings(holdings)}
                        allocation={allocation}
                        optimizationStartDate={optimizationStartDate}
                        optimizationEndDate={optimizationEndDate}
                        rebalancingFrequency={rebalancingFrequency}
                        targetReturn={targetReturn}
                        targetVolatility={targetVolatility}
                        onEdited={onEdited}
                        onCreated={onCreated}
                    />
                </div>
            </Modal>
            {portfolioCard}
        </React.Fragment>
    )
}
export default PortfolioItem;
