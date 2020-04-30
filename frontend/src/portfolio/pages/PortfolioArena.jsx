import React, { useState, useEffect } from "react"
import { Layout, Alert, Spin, Typography } from 'antd';
import PortfolioComparisonForm from "../components/PortfolioComparisonForm"
import Analytics from "../../analysis/pages/Analytics"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { useParams } from 'react-router-dom';

const { Sider, Content } = Layout;
function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

const analyticsCategories = [
    { key: "performance", tab: "Performance" },
    { key: "attribution", tab: "Attribution" },
    { key: "riskMetrics", tab: "Risk Metrics" },
    { key: "diversification", tab: "Correlation" }
]

const PortfolioArena = () => {
    const portfolioName = decodeURIComponent(useParams().portfolioName);
    const [comparisonSettings, setComparisonSettings] = useState({ compPortfolios: [portfolioName] })
    const [portfolioNames, setPortfolioNames] = useState([]);
    const [tearsheet, setTearsheet] = useState({})

    const { sendRequest, isLoading, error } = useHttpClient();

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                let responseData = await sendRequest("/api/user/portfolios")
                setPortfolioNames(responseData.portfolios.map(portfolio => {
                    return portfolio.name
                }))

            }
            catch (e) { }
        }
        fetchPortfolios();
    }, [sendRequest])


    useEffect(() => {
        const fetchTearsheet = async () => {
            try {
                let responseData = await sendRequest("/api/tearsheet/portfolio-comparison",
                    "POST",
                    JSON.stringify(comparisonSettings),
                    {
                        'Content-Type': 'application/json'
                    },
                )
                setTearsheet(responseData)
            } catch (e) { }
        }
        fetchTearsheet();
    }, [sendRequest, comparisonSettings])

    const handleGo = (analysisSettings) => {
        setComparisonSettings(analysisSettings)
    }

    return (
        <Layout style={{ backgroundColor: "white" }}>
            {!isEmpty(tearsheet) && <Sider
                breakpoint="md"
                collapsedWidth="0"
                theme="light"
                width={350}
                style={{ padding: 15 }}
            >
                <PortfolioComparisonForm
                    userPortfolioNames={portfolioNames}
                    initialPortfolio={portfolioName}
                    onGo={handleGo}
                    analysisStartDate={tearsheet.analysis_range.start}
                    analysisEndDate={tearsheet.analysis_range.end}
                />
            </Sider>}
            {error && <Alert
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: "5px" }}
            />}
            {isLoading && <Spin size="large"></Spin>}
            {!isEmpty(tearsheet) && !error && !isLoading && <Content style={{ margin: 0, padding: 15, backgroundColor: "white", maxWidth: "1000px" }}>
                <Analytics
                    analyticsCategories={analyticsCategories}
                    tearsheet={tearsheet}
                    isLoading={isLoading}
                    title={
                        <React.Fragment>
                            <Typography.Title level={3} className="center">Portfolio Comparison </Typography.Title>
                            <Typography.Text className="center"> For the period: {tearsheet.analysis_range.start} to {tearsheet.analysis_range.end}, using monthly returns</Typography.Text>
                        </React.Fragment>
                    } />

            </Content>}

        </Layout>
    )
}

export default PortfolioArena